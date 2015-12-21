# flux-reactjs-chain-reactions
This is more or less a demo project to achieve the following goal: we have a series of user controls written in reactjs, the content of the controls are populated by doing ajax GET requests to a server. The key point is, the change of an upstream control will trigger of a series of changes of all the downstream controls. Imagine you are playing with a file system browser:

~~~
root-> level1 ->level2
~~~

When we change the root folder, because the contents of the two root folders are very likely to be different, we will also need to change the display of level1 and level2, since or level1 folder also changed, we need to change the display of level2 too, etc.

It is very easy to achieve by chaining the events, that is, each user control will broadcast a unique event when it's content changes due to user interaction, and all the downstream controls will respond to that event. But the problem of this is, when we have a lot of controls, we have a lot of dependencies and a lot of repetitve code to write! Here I am trying to use flux pattern to save some code writing by simplify the events dependency.

Dec. 21. 2015
Current Process:

1. Add a new ReactView under components, change all occurances of the name (e.g AppComponent0) to the name you desire. Add this view to the ViewConfig

2. Add e new Store under stores, change all occurance of the store name(e.g. AppComponent0Store) to what you desire (This I can do better, I think I can remove the need of doing this), add this store to StoreConfig

3. In the main View, import the new view and use it!
