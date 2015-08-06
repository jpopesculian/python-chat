
class RootController:

    @app.route('/')
    def index():
        return 'Hello World!'
