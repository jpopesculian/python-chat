# # Start gunicorn server
# ./venv/bin/gunicorn  \
#   --reload  \
#   -p RUNNING_PID \
#   -e FLASK_ENV=dev \
#   -b localhost:5000 \
#   --workers 3 \
#   api.main:app
#   # --threads 4 \
#   # --error-logfile gunicorn.log \
#   # --daemon \
#   # --worker-class gevent \
#   -c gunicorn
./venv/bin/gunicorn -c file:../../api/config/gunicorn/default.py api.main:app

# start gulp
# gulp serve
