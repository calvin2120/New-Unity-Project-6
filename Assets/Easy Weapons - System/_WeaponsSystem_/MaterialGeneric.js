//---------------------------------------------------------------------------------------------------------	
// Material script for Weapon system
// Allow object to interact with missiles and ray tracer from WeaponGeneric script
// Can produce decals, count damage and destroy (and replace to wreck) the object  when durability is 0 or less
//---------------------------------------------------------------------------------------------------------	

#pragma strict
@script AddComponentMenu ("EasyWeapons/Material Generic ")

public enum MaterialType {basic, reactive, destructable, reactive_destructable} // basic - just create decals, destructable - process damage etc.

var type: MaterialType;    			// Type of material. Currently only two. 
var durability: float;				// How much damage can be applied to object (only if type = destructable)
var physicReactivity: float = 10;	// How strong will object react on bullet collision (only if object has Rigidbody)
var wreck: GameObject;				// Wreck object to replace current object after destruction (only if type = destructable, just leave it empty if you don't need this feature)
var decal: GameObject;				// Object to be instanciated in the hit point (just leave empty if you don't need this feature)

//========================================================================================================
// Apply damage and force, create decals
function applyDamage (amount:float, hitInfo:RaycastHit, createDecals:boolean) 
{
 // Create decals
     if (decal) 
       {
         if (createDecals)
          {
	        var decalInstance : GameObject = Instantiate(decal, hitInfo.point, decal.transform.rotation);
	        decalInstance.SetActive(true);
	        decalInstance.transform.rotation = Quaternion.FromToRotation (Vector3.forward,hitInfo.normal);
	        decalInstance.transform.Translate(Vector3(0, 0, 0.01));
	        decalInstance.transform.parent = gameObject.transform;
          }
       }
         else
           Debug.Log("Decal object is missed! Check: " + gameObject.name);
    

        
// Apply damage if object type = destructable   
    switch (type)
	  {
	     case MaterialType.basic:
	     break;
	     
	     case MaterialType.destructable:
	         decDurability(amount);
	     break;
	     
	     case MaterialType.reactive:
			// Apply physic force (only if object has Rigidbody)
	        if (rigidbody) rigidbody.AddForceAtPosition(Vector3.Reflect(hitInfo.normal,hitInfo.normal)*amount*physicReactivity, hitInfo.point);
	     break;
	     
	     case MaterialType.reactive_destructable:
	        decDurability(amount);
			// Apply physic force (only if object has Rigidbody)
	        if (rigidbody) rigidbody.AddForceAtPosition(Vector3.Reflect(hitInfo.normal,hitInfo.normal)*amount*physicReactivity, hitInfo.point);
	     break;
	  }
}
//---------------------------------------------------------------------------------------------------------	
// Just apply damage if object type = destructable 
function applyDamage (amount:float) 
{
    switch (type)
	  {
	     case MaterialType.basic:
	     break;
	     
	     case MaterialType.destructable: case MaterialType.reactive_destructable:
	         decDurability(amount);
	     break;
	     
	  }
}
//---------------------------------------------------------------------------------------------------------	
// Decrease  durability and destroy object 
function decDurability (amount:float) 
{
  if (durability>amount) durability-=amount;
    else 
     {
      // Create wreak object if it's exist in properties
       if (wreck) 
        {
         var wreckInstance : GameObject = Instantiate(wreck, transform.position, transform.rotation);
         wreckInstance.SetActive(true);
        }
        // else
         //  Debug.Log("Wreck object is missed! Check: " + gameObject.name);
           
	   Destroy(gameObject);
     }
  
}

//---------------------------------------------------------------------------------------------------------	
// Increase object durability 
function incDurability (amount:float) 
{

   durability+=amount;
  
}
//---------------------------------------------------------------------------------------------------------	