def isxmas(t):
    s = ''
    for i in t:
        s += chr(i)
    return s=='XMAS' or s=='SAMX'

def solve(f):
    da = list(s.rstrip().encode() for s in f)
    wd = len(da[0])
    ht = len(da)
    z = 0
    for y in range(3,ht):
        for x in range(wd):
            if isxmas(da[y-i][x] for i in range(4)):
                z += 1
        for x in range(3,wd):
            if isxmas(da[y-i][x-i] for i in range(4)):
                z += 1
            if isxmas(da[y-i][x-3+i] for i in range(4)):
                z += 1
    for x in range(3,wd):
        for y in range(ht):
            if isxmas(da[y][x-i] for i in range(4)):
                z += 1
    z2 = 0
    for x in range(2,wd):
        for y in range(2,ht):
            s1 = ''
            for i in (da[y-i][x-i] for i in range(3)):
                s1 += chr(i)
            s2 = ''
            for i in (da[y-i][x-2+i] for i in range(3)):
                s2 += chr(i)
            if (s1=='MAS' or s1=='SAM') and (s2=='MAS' or s2=='SAM'):
                z2 += 1
    return (z,z2)
