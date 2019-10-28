#!/bin/bash
echo ‘post-receive: Triggered.’
echo ‘post-receive: pulling from repo…’
git pull \
&& echo ‘Done pulling from repo’

#bulle