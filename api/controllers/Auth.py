from api.core import Controller, route, socket

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
        return 'provider: ' + provider

    @route('/<provider>/callback')
    def callback(self, provider):
        return 'callback: ' + provider
