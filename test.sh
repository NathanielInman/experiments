git filter-branch -f --env-filter \
  'if [ $GIT_COMMIT = 41718fc865aeca3fe6786eb6874047a63d95903d ]
   then
     export GIT_AUTHOR_DATE="Thu Oct 9 21:38:53 2014 -0600"
     export GIT_COMMITTER_DATE="Thu Oct 9 22:01:01 2014 -0600"
   fi'
