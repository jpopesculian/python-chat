import bcrypt
from api.core import Controller, route, Db
from api.models import User, Passport
from api.utils.codes import UNAUTHORIZED
from api.utils.misc import all_in
from api.utils.strings import str_to_bytes, bytes_to_str

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
        if provider == 'local':
            data = self.request.json
            if not all_in(data, 'username', 'email', 'password'):
                return ({'error': 'Not Authorized!'}, UNAUTHORIZED)
            password = str_to_bytes(data['password'])
            key = bytes_to_str(bcrypt.hashpw(password, bcrypt.gensalt()))
            email = data['email']
            name = data['username']
        db = Db()
        user = db.query(User).filter_by(email=email, name=name).first()
        if not user:
            user = User(name=name, email=email)
            db.add(user)
            db.commit()
        passport = db.query(Passport).filter_by(user_id=user.id, provider=provider).first()
        if not passport:
            passport = Passport(user_id=user.id, provider=provider, key=key)
            db.add(passport)
            db.commit()
        elif provider == 'local':
            hashed = str_to_bytes(passport.key)
            if not bcrypt.hashpw(password, hashed) == hashed:
                return ({'error': 'Not Authorized!'}, UNAUTHORIZED)
        else:
            provider.key = key
            db.commit()
        return self.authorize(user)
