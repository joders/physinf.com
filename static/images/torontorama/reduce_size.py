#!/usr/bin/python3

import sys
from PIL import Image


for i in sys.argv[1:]:
    print("processing "+i)
    im = Image.open(i)
    im.save('small/'+i, quality=30)

