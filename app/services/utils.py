import glob, os

def list_all_modules(filename):
    modules = glob.glob(os.path.dirname(filename)+"/*.py")
    return [ os.path.basename(f)[:-3] for f in modules]
