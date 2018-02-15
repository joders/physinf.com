#!/usr/bin/python3

import os
from PIL import Image

size = 128, 128

pics = set(os.listdir('.'))
pics = pics - {'create_thumbnails.py', 'thumbnails', 'myConv'}
thumbs = set(os.listdir('thumbnails'))

pics_to_process = pics - thumbs

for p in pics_to_process:
    try:
        im = Image.open(p)
        im.thumbnail(size)
        im.save('thumbnails/' + p, "JPEG")
        print('created thumbnails/' + p)
    except IOError:
        print("cannot create thumbnail for " + p)

