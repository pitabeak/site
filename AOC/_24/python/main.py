import pathlib
import os
import sys
import time
import importlib

f = sys.stdin if not sys.stdin.isatty() else None
for i in sys.argv[1:]:
    if not f:
        n = f"/site/aoc/_24/dat/_{i:0>2s}.txt"
        f = open(os.path.expanduser("~")+os.path.normpath(n),"r")
    print()
    print("Day",i)
    n = f"days._{i:0>2s}"
    m = importlib.import_module(n,"r")
    t = time.time()
    z,z2 = m.solve(f)
    t = time.time()-t
    print(f"({t:.3f} secs)")
    print(z)
    print(z2)
    
