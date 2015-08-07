import glob, os, inspect, ast

def list_all_modules(filename):
    modules = glob.glob(os.path.dirname(filename)+"/*.py")
    names = [ os.path.basename(f)[:-3] for f in modules]
    return [name for name in names if not name.startswith("__")]

def find_decorators(controller):
    res = {}
    def visit_FunctionDef(node):
        res[node.name] = [ast.dump(e) for e in node.decorator_list]
    V = ast.NodeVisitor()
    V.visit_FunctionDef = visit_FunctionDef
    V.visit(compile(inspect.getsource(controller), '?', 'exec', ast.PyCF_ONLY_AST))
    return res
