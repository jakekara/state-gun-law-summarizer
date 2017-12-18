# Diving into BU comparison of all states' gun laws

Downloaded data from here: https://www.statefirearmlaws.org/
It's amazing.

# Graphics

Graphics are in the viz directory. That directory can just be hosted
somewhere, like an S3 bucket.

Within that directory, edit js/gunlaws.js and change the STATE_NAME
variable to whatever state name you want this tool to focus on. You could
easily adapt this code to use browser location information, or let the user
choose the state.

# Restructuring

All the restructuring code to turn the raw data into state-level JSON files
is in the Pandas notebook.

# Reuse

Please feel free to re-use this, especially for journalistic purposes. I
would appreciate a heads-up if you do, but not required.

