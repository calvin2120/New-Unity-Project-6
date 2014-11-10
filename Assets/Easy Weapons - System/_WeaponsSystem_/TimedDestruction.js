//---------------------------------------------------------------------------------------------------------	
// Simple script, that destroys current object after lifeTime time
//---------------------------------------------------------------------------------------------------------	

#pragma strict


var lifeTime: float = 3;  				 // After this time object will be destroyed
var onlyIfNotVisible: boolean = false;   // Destroy only when object is no longer visible by any camera

private var ReadyToDestroy: boolean = false;


//=======================================================================================================
//Init
function Start () 
{
  // Time when object will be destroyed
	lifeTime = lifeTime + Time.time;  

	ReadyToDestroy = !onlyIfNotVisible;
} 
	
//---------------------------------------------------------------------------------------------------------	
// Check visibility to allow destroying (only if onlyIfNotVisible=true)
function OnBecameInvisible () 
{
    if (onlyIfNotVisible) ReadyToDestroy = true;
}

function OnBecameVisible () 
{
    if (onlyIfNotVisible) ReadyToDestroy = false;
}

//---------------------------------------------------------------------------------------------------------	
// Destroy the object if it lifeTime has expired
function Update () 
{
	if (Time.time > lifeTime  && ReadyToDestroy)  Destroy(gameObject); 

}

//---------------------------------------------------------------------------------------------------------

