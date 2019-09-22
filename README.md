We now have a basic understanding of how APIs present data to us and how to retrieve that data.
Our aim for this video is to use JavaScript to get that data for us and display it for the user.
In order to do that, I have created a new workspace called "ajax-test".
Inside the workspace, the first thing I want to do is to create a new file, which I'm going to save it as index.html.
Then, we'll just put in some of our standard boilerplate HTML code.
So I have my <html> element inside there. I have a <head> element, my <title> is "AJAX Test".
Then I'm going to put in a reference to a script.
My script is just going to be called "main.js".
That will live in the same directory as our HTML file.
Inside the body, I'm going to create a single div.
And I'm going to give it the ID of "data" because this is where we're going to put the data that we consume from our API.
Now we need to create a new file.
And I'm going to call that "main.js".
Now that that's saved, I can create a new variable. I'm going to call it "var xhr = new XMLHttpRequest()".
And this XMLHttpRequest object is an inbuilt object that JavaScript provides to allow us to consume APIs.
So this gives us the method to open connections, to send connections, and close them.
Now we want to create a new function: xhr.onreadystatechange().
And whenever the state changes of our xhr object, we want to run a check.
If the ready state is equal to 4 and the status is 200, then what we want to do is use JavaScript to do document.getElementByID() and retrieve our data div.
And then we're going to change the innerHTML to be equal to the response text that comes back from our xhr object.
I'll just pop a semicolon on at the end here.
Now that we have this listener waiting to see for xhr's state to change, I need to open a connection.
So I do xhr.open().
I parse in the GET() method, which is what we want to use.
And then I parse in the URL, which in this case is "http://www.swapi.co/api/".
And now I use xhr.send().
So when the state changes, we'll check to see if the ready state is 4. We'll discuss what these states and statuses mean in the next video.
But basically, we can say that it means that if everything went well, then we're going to get a div ID of "data", and put the response text in it.
Let's go back to our index.html and run it.
When we do, we can see that we have this JSON object that's been put inside our div.
So that's working as we expected.
Now that we have data displaying in our browser and it's working okay, we've covered how to do this, but in our next video, we'll step through the code and see why it works.

Why doesn't our "console.log(data)" work?
Well there's a very good reason for this which is that the "onreadystatechange" function only sets the data variable to contain the response text when the ready state equals 4 and the status equals 200.
Our function has been called five times by the time that our data variable is set, whereas our "console.log" is only ever called once.
And that will be right after we've run "xhr.send".
So this means that when we run "console.log(data)", it doesn't have anything in there yet.
Data is not set until after "console.log" has been called, which is why we're getting a response of undefined.
The problem with this is it means that all of the work we need to do with data would have to be done inside the "xhr.onreadystatechange" function, which could make things really messy and complicated because all of the code for our application could potentially end up inside this function.
So how do we get the data out of here?
Well one thing that we could do is create a separate function.
And we can parse our data to that function.