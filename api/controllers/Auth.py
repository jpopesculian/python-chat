from api.core import Controller, route, Db
from api.models import User, Passport
from api.utils.codes import UNAUTHORIZED
from api.utils.misc import all_in

class AuthController(Controller):

    _RESOURCE = 'auth'

    @route('/logout')
    def logout(self):
        return 'logout'

    @route('/who')
    def who(self):
        return 'who'

    @route('/<provider>')
    def provider(self, provider):
        return provider

    @route('/<provider>/<action>', methods=['GET', 'POST'])
    def callback(self, provider, action):
        # get required params
        if provider == 'local':
            data = self.request.json
            if not all_in(data, 'username', 'email', 'password'):
                return {'error': 'form_incomplete'}, UNAUTHORIZED
            key = data['password']
            email = data['email']
            name = data['username']
        # find / create user
        db = Db()
        user = db.query(User).filter((User.email == email) | (User.name == name)).first()
        if user and provider == 'local':
            return {'error': "user_exists"}, UNAUTHORIZED
        elif not user:
            try:
                user = User(email=email, name=name)
            except AssertionError:
                return {'error': "invalid_user"}, UNAUTHORIZED
            db.add(user)
            db.commit()
        # create / update passport
        passport = db.query(Passport).filter_by(user_id=user.id, provider=provider).first()
        if not passport:
            passport = Passport(user_id=user.id, provider=provider)
            db.add(passport)
        try:
            passport.key = key
        except AssertionError:
            db.delete(user)
            return {'error': "invalid_password"}, UNAUTHORIZED
        db.commit()
        return self.authorize(user)
