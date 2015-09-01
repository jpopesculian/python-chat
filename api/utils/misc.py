def splash(server_name=''):
    logo = """
     \ _______/ V`-,  %s
      }        /~~'   %s
      /_)^ --,r'
      |b      |b
    """ % ("WORKER STARTED", server_name)
    print(logo)

def all_in(universe, *pieces):
    for piece in pieces:
        if piece not in universe:
            return False
    return True
