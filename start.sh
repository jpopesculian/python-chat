# Start gunicorn server
./venv/bin/gunicorn  \
  --reload  \
  -p RUNNING_PID \
  -e FLASK_ENV=dev \
  -b localhost:5000 \
  --threads 4 \
  --workers 1 \
  api.main:app
  # --error-logfile gunicorn.log \
  # --daemon \

# start gulp
# gulp serve
