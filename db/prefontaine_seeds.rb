Comment.where(author_id: 1).destroy_all
Comment.create!([
  {body: "Nice long run!", workout_id: 65, author_id: 1},
  {body: "So cool!", workout_id: 39, author_id: 1},
  {body: "hhi!", workout_id: 52, author_id: 1}
])
Follow.where(author_id: 1).destroy_all
Follow.create!([
  {follower_id: 1, followee_id: 6},
  {follower_id: 1, followee_id: 7},
  {follower_id: 1, followee_id: 13},
  {follower_id: 1, followee_id: 10},
  {follower_id: 1, followee_id: 3},
  {follower_id: 1, followee_id: 4},
  {follower_id: 1, followee_id: 5}
])
Membership.where(member_id: 1).destroy_all
Membership.create!([
  {member_id: 1, team_id: 1},
  {member_id: 1, team_id: 2},
])
Workout.where(user_id: 1).destroy_all
Workout.create([
  {user_id: 1, title: "Schenley, 6x3 on track", activity: "Running", date: "2015-10-01 00:00:00", distance: 10.5, duration: "2000-01-01 01:09:45", notes: "45 up (quick pace), 6x300 w/ 45s rest: 51, 52, 51, 51, 50, 50. 16 down.", distance_unit: "miles", miles_equivalent: 10.5},
  {user_id: 1, title: "Biking double", activity: "Biking", date: "2015-10-02 00:00:00", distance: 5.0, duration: "2000-01-01 00:20:00", notes: "Biked the course after practice for extra CD", distance_unit: "kilometers", miles_equivalent: 9.5},
  {user_id: 1, title: "1k / 3mile / 800", activity: "Running", date: "2015-10-02 00:00:00", distance: 9.5, duration: "2000-01-01 01:00:00", notes: "20 up, 1k in 3:04, 3m rest, first 3 of course in 17:19, 6:43 jog, 800 on track in 2:34, 1.5 down.", distance_unit: "miles", miles_equivalent: 9.5},
  {user_id: 1, title: "Easy", activity: "Running", date: "2015-10-03 00:00:00", distance: 5.5, duration: "2000-01-01 00:37:08", notes: "Was feeling very tired today, needed a lighter day so I cut it short. ", distance_unit: "miles", miles_equivalent: 5.5},
  {user_id: 1, title: "5x200", activity: "Running", date: "2015-10-04 00:00:00", distance: 9.0, duration: "2000-01-01 00:00:00", notes: "~6.5 up, 5x200 in 32, 36, 32, 32, 31; 1 down.", distance_unit: "miles", miles_equivalent: 9.0},
  {user_id: 1, title: "Off", activity: "Running", date: "2015-09-30 00:00:00", distance: 0.0, duration: "2000-01-01 00:00:00", notes: "easy day", distance_unit: "miles", miles_equivalent: 0.0},
  {user_id: 1, title: "Easy pre-meet", activity: "Running", date: "2015-10-05 00:00:00", distance: 6.75, duration: "2000-01-01 00:46:52", notes: "Pre-home meet run in Schenley", distance_unit: "miles", miles_equivalent: 6.75},
  {user_id: 1, title: "CMU Invite", activity: "Running", date: "2015-10-06 00:00:00", distance: 8.0, duration: "2000-01-01 00:00:00", notes: "Home meet. See nordic details for splits", distance_unit: "miles", miles_equivalent: 8.0},
  {user_id: 1, title: "Off", activity: "Running", date: "2015-10-07 00:00:00", distance: 0.0, duration: "2000-01-01 00:00:00", notes: nil, distance_unit: "miles", miles_equivalent: 0.0},
  {user_id: 1, title: "Off", activity: "Running", date: "2015-10-08 00:00:00", distance: 0.0, duration: "2000-01-01 00:00:00", notes: nil, distance_unit: "miles", miles_equivalent: 0.0},
  {user_id: 1, title: "Smithfield Bridge", activity: "Running", date: "2015-10-09 00:00:00", distance: 9.25, duration: "2000-01-01 01:04:16", notes: "Using some new shoes", distance_unit: "miles", miles_equivalent: 9.25},
  {user_id: 1, title: "8x8 in Frick", activity: "Running", date: "2015-10-10 00:00:00", distance: 10.0, duration: "2000-01-01 00:00:00", notes: "23min up, 8x8 in Frick with 90s rest: 2:37, :38, :36, :36, :35, :36, :33, :30. 19min down. First 6 with group2, then last 2 with Ken (we're not racing this weekend). Felt tired, but not unable to complete the workout by any means", distance_unit: "miles", miles_equivalent: 10.0},
  {user_id: 1, title: "Off", activity: "Running", date: "2015-10-11 00:00:00", distance: 0.0, duration: "2000-01-01 00:00:00", notes: nil, distance_unit: "miles", miles_equivalent: 0.0},
  {user_id: 1, title: "Desert Trail Running", activity: "Running", date: "2015-10-12 00:00:00", distance: 10.0, duration: "2000-01-01 01:07:37", notes: "Found a neat mountain biking / trail running trail in the desert outside Phoenix, had a nice run at sunset. Ran into 8 coyotes on the path around halfway and decided it was a good time to turn around.", distance_unit: "miles", miles_equivalent: 10.0},
  {user_id: 1, title: "Back in Pittsburgh", activity: "Running", date: "2015-10-13 00:00:00", distance: 9.38, duration: "2000-01-01 01:04:43", notes: "First GPS run since August. Ran with Darren biking alongside, from Fairfax down the jail trail. Pleasant evening run, nice temp out.", distance_unit: "miles", miles_equivalent: 9.38},
  {user_id: 1, title: "Course Tempo", activity: "Running", date: "2015-10-14 00:00:00", distance: 10.19, duration: "2000-01-01 01:06:33", notes: "2.2up and 3down. 5 mile tempo: did the course (5:42, 5:50, 5:38, 5:47, 5:55). Went just after sunset so the tempo was actually pretty dark, but visible enough to avoid concussions. Ankles a bit sore, but was the tempo was pretty comfortable ", distance_unit: "miles", miles_equivalent: 10.19},
  {user_id: 1, title: "Rainy in Frick", activity: "Running", date: "2015-10-15 00:00:00", distance: 8.5, duration: "2000-01-01 00:57:33", notes: "Rainy run in Frick with Adam, Evan, Brendan, Keith... Braddock Trail", distance_unit: "miles", miles_equivalent: 8.5},
  {user_id: 1, title: "300s", activity: "Running", date: "2015-10-16 00:00:00", distance: 9.0, duration: "2000-01-01 00:00:00", notes: "45 up, 6x300 with alternating 100m/300m rest: 50 50 48 49 48 48. 7:41 down.", distance_unit: "miles", miles_equivalent: 9.0},
  {user_id: 1, title: "Fast 1.8s", activity: "Running", date: "2015-10-17 00:00:00", distance: 9.0, duration: "2000-01-01 00:00:00", notes: "20 up, 2x1.8 in 9:21, 9:14 (8 min rest), then 6 min rest, then 1k in 2:53; ~2 down. Felt really good on this workout, pretty quick times too. Calling this the inflection point :)", distance_unit: "miles", miles_equivalent: 9.0},
  {user_id: 1, title: "Women's Scavenger Hunt Dry run", activity: "Running", date: "2015-10-18 00:00:00", distance: 7.5, duration: "2000-01-01 00:52:00", notes: "Rainy miserable run in cemetary with Evan, Joe, and Brendan trying to learn where to go for the scavenger hunt. Pretty cold / nasty out.", distance_unit: "miles", miles_equivalent: 7.5},
  {user_id: 1, title: "Women's Scavenger Hunt", activity: "Running", date: "2015-10-19 00:00:00", distance: 7.5, duration: "2000-01-01 00:50:30", notes: "Set up clues for scavenger hunt with Evan and Joe, so not too long of a run. Had to get back for work. Lots of stop/go for this run", distance_unit: "miles", miles_equivalent: 7.5},
  {user_id: 1, title: "Mt Washington", activity: "Running", date: "2015-10-20 00:00:00", distance: 13.0, duration: "2000-01-01 01:27:38", notes: "Solo ~long run this morning, nice run to the top of Wash, just missed the rain. Legs feeling good", distance_unit: "miles", miles_equivalent: 13.0},
  {user_id: 1, title: "Off", activity: "Running", date: "2015-10-21 00:00:00", distance: 0.0, duration: "2000-01-01 00:00:00", notes: nil, distance_unit: "miles", miles_equivalent: 0.0},
  {user_id: 1, title: "6x1000", activity: "Running", date: "2015-10-22 00:00:00", distance: 9.0, duration: "2000-01-01 00:00:00", notes: "20 up, 6x1000 with increasing rest: 3:10, 3:11, 3:03, 3:05, 3:02, 2:57. 16 down. Legs were definitely tired by the end, but managed to hit pace more or less. ", distance_unit: "miles", miles_equivalent: 9.0},
  {user_id: 1, title: "Easy Schenley", activity: "Running", date: "2015-10-23 00:00:00", distance: 7.25, duration: "2000-01-01 00:50:30", notes: "Easy run with George and Nathan. Nothing too exciting.", distance_unit: "miles", miles_equivalent: 7.25},
  {user_id: 1, title: "300s", activity: "Running", date: "2015-10-24 00:00:00", distance: 7.75, duration: "2000-01-01 00:00:00", notes: "~4.5 up, 6x300: 50 51 50 50 49 48, ~2 down. Same alternating 100m/300m rest for the 300s, felt pretty comfortable. ", distance_unit: "miles", miles_equivalent: 7.75},
  {user_id: 1, title: "Easy Schenley", activity: "Running", date: "2015-10-25 00:00:00", distance: 4.5, duration: "2000-01-01 00:31:21", notes: "Easy run in Schenley with Ken. Great weather. ", distance_unit: "miles", miles_equivalent: 4.5},
  {user_id: 1, title: "Rochester Course Preview", activity: "Running", date: "2015-10-26 00:00:00", distance: 5.0, duration: "2000-01-01 00:33:16", notes: "Ran the course with the team. I like this course, 4 reps of a 2k loop with a slight hill section on one side. Looks like a pretty fast course, plenty of split information, excited for tomorrow.", distance_unit: "miles", miles_equivalent: 5.0},
  {user_id: 1, title: "Scavenger Hunt", activity: "Running", date: "2015-09-29 00:00:00", distance: 13.0, duration: "2000-01-01 00:01:30", notes: "Mapped the scavenger hunt to be about 11.5 miles, plus .75 to/from Fairfax-Skibo. Lots of start/stop so not an ideal long run, but really fun scavenger hunt. Invisible ink and bucket filling and dinosaur clues galore. Definitely a memorable practice. Team: Bollens, Butters, Newby, Nathan, Robby, Brendan (Schiller failed to wake up in time, oops)", distance_unit: "miles", miles_equivalent: 13.0},
  {user_id: 1, title: "Schenley Tempo & 2k", activity: "Running", date: "2015-09-28 00:00:00", distance: 9.75, duration: "2000-01-01 00:04:00", notes: "~3 up/down, first 3mi of course in 17:30, then 2k on the oval in 6:33. A little tired by the end of the 2k, but comfortable workout otherwise", distance_unit: "miles", miles_equivalent: 9.75},
  {user_id: 1, title: "Schenley", activity: "Running", date: "2015-09-27 00:00:00", distance: 8.99, duration: "2000-01-01 01:01:54", notes: "New shoes came. (Old ride 4s). +strides/core", distance_unit: "miles", miles_equivalent: 8.99}
])
