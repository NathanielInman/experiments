git filter-branch -f --env-filter \
  'if [ $GIT_COMMIT = 43347c97f2a149fed8d16f35ae85925ba1ca6522 ]
   then
     export GIT_AUTHOR_DATE="Sat Oct 11 21:38:53 2014 -0600"
     export GIT_COMMITTER_DATE="Sat Oct 11 22:01:01 2014 -0600"
   fi'
