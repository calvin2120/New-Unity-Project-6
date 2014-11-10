//---------------------------------------------------------------------------------------------------------	
// Can be attached to weapon  as  child object to simulate different effects (smoke, muzzle flash, etc)
// Proper effect should be attached as Game object. It will be visualized in gameObject.transform
//---------------------------------------------------------------------------------------------------------	

#pragma strict
@script AddComponentMenu ("EasyWeapons/WeaponFX/Weapon FX Manager")

class weaponFX
{
    var caption: String;
	var FXObject: GameObject;				// Object to be shown
	var randomize: boolean;					// Set true to randomize FX appearance
	var resetTransform: boolean = false;	// Reset FX transform to weapon transform
	var ActivityTime: float = 0.1;			// How long should be  FX  visible

	private var RemainActivityTime: float;
	
	//---------------------------------------------------------------------------------------------------------	
	// Initialize
	function Init () 
	{

	/* if (FXObject && resetTransform)
	 {
	  FXObject.SetActive(false);
	  FXObject.transform.position = transform.position;
	  FXObject.transform.rotation = transform.rotation;
	  FXObject.transform.parent = transform;
	 }*/
	 // else
	   //  Debug.Log("FX object is missed! Check: " + gameObject.name);
	}

	//---------------------------------------------------------------------------------------------------------	
	function Process () 
	{
	   if (RemainActivityTime <= Time.time)  SetFXActive(false);
	    
	}

	//---------------------------------------------------------------------------------------------------------	
	// Initialize and  activate(show) FX
	function Activate () 
	{
	  var active: boolean = true;
	  if(randomize) if (Random.Range(-1,1) < 0) active = false;
	   
	    RemainActivityTime = Time.time + ActivityTime;
	    SetFXActive(active);
	  
	}

	//---------------------------------------------------------------------------------------------------------	
	// Force FX activity to true/false
	function SetFXActive (active: boolean) 
	{
	   if (FXObject)
	    FXObject.SetActive(active);
	  // else
	  //   Debug.Log("FX object is missed! Check: " + gameObject.name);
	}
	//---------------------------------------------------------------------------------------------------------	

}

var FXs : weaponFX[];

//========================================================================================================
function Start () 
{
   for (var i:int = 0; i < FXs.Length; i++)  
    if (FXs[i].FXObject && FXs[i].resetTransform)
	 {
	  FXs[i].FXObject.SetActive(false);
	  FXs[i].FXObject.transform.position = transform.position;
	  FXs[i].FXObject.transform.rotation = transform.rotation;
	  FXs[i].FXObject.transform.parent = transform;
	 }
}

//---------------------------------------------------------------------------------------------------------	
// Initialize and activate(show) all FXs
function Activate () 
{
   
   for (var i:int = 0; i < FXs.Length; i++)  FXs[i].Activate();
  
}
//---------------------------------------------------------------------------------------------------------	
function Update () 
{
	for (var i:int = 0; i < FXs.Length; i++)  FXs[i].Process();
	    
}
//---------------------------------------------------------------------------------------------------------	


//========================================================================================================
// Initialize
/*function Start () 
{

 if (FX && resetTransform)
 {
  FX.SetActive(false);
  FX.transform.position = transform.position;
  FX.transform.rotation = transform.rotation;
  FX.transform.parent = transform;
 }
 // else
   //  Debug.Log("FX object is missed! Check: " + gameObject.name);
}

//---------------------------------------------------------------------------------------------------------	
function Update () 
{
   if (RemainActivityTime <= Time.time)  SetFXActive(false);
    
}

//---------------------------------------------------------------------------------------------------------	
// Initialize and  activate(show) FX
function Activate () 
{
  var active: boolean = true;
  if(randomize) if (Random.Range(-1,1) < 0) active = false;
   
    RemainActivityTime = Time.time + ActivityTime;
    SetFXActive(active);
  
}

//---------------------------------------------------------------------------------------------------------	
// Force FX activity to true/false
function SetFXActive (active: boolean) 
{
   if (FX)
    FX.SetActive(active);
  // else
  //   Debug.Log("FX object is missed! Check: " + gameObject.name);
}
*/
//---------------------------------------------------------------------------------------------------------	