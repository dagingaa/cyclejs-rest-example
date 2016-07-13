#CycleJS Example App
This is a prototype application to see how CycleJS and xstream play together to
form a simple application making REST requests based on some simple inputs, and
render the response that you get.

There has been no focus on making this in any way beautiful, but it works. Kind of.

The main issue I have with this is that error handling is largely undocumented,
so if one request fails, the only way to recover is to refresh the application.
Also, the UX could be better, but that was never the point of this application.

I have to admit I struggle to see how this is better than say preact or react
which have a more "object oriented" approach to structuring applications,
compared to this completely reactive and functional approach. However, once I
figured out how to make Components and strucutre those in a meaningful way,
things became better. However, this was a fun deep dive into some cool new ES
features, and a good showcase for getting an app up and running quickly.

Hopefully this can be useful for someone else.

##Running the app
Running this is pretty straightforward. Make sure you have run `npm i`, then
just start the thing with `npm start` and open http://localhost:8080.
