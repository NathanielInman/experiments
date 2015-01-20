git filter-branch --env-filter \
  'if [ $GIT_COMMIT = f6e57816882077498c2d069313f22c8cc6aa1c20 ]
   then
     export GIT_AUTHOR_DATE="Wed Oct 8 21:38:53 2014 -0600"
     export GIT_COMMITTER_DATE="Wed Oct 8 22:01:01 2014 -0600"
   fi'
