#!/bin/bash

sh ./.script/pre-install.sh

yarn install --immutable

sh ./.script/post-install.sh
