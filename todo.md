ideas:
use encrypted id as verification for clients being logged in? or randomly generated userid linked to accounts, earlier approach is less safe but easier
consider express-session

backend:
crypto of passwords + ids
look over adding documents after front end, ppl say it doesn't work?

frontend:
Login✅
find way to track being logged in✅
WYSIWYG editor site✅
show list of documents(only owned? all?)✅
view document✅
edit document✅

Backend:
Improve security -> Sessions?
Create sessions on login in a database linked to userid, sessions contain a token, user stores it in localstorage, on api calls, send it and server verifies. On logout mark sessions "inactive".