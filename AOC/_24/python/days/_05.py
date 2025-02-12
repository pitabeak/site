import itertools
def solve(f):
    da = set((s[:2],s[3:5]) for s in itertools.takewhile(lambda s: len(s)>1,f))
    z = 0
    for s in f:
        a = s.rstrip().split(',')
        if not any((y,x) in da for x,y in itertools.combinations(a,2)):
            z += int(a[len(a)//2])
    return (z,0)
