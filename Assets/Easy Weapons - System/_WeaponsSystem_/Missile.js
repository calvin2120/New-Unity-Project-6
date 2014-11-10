//---------------------------------------------------------------------------------------------------------	
// Script to simulate missiles, balls, bombs, grenades etc. 
// Should be used with GenericMaterial script to damage objects
//---------------------------------------------------------------------------------------------------------	

#pragma strict
@script RequireComponent(Rigidbody)
@script RequireComponent(SphereCollider)
@script AddComponentMenu ("EasyWeapons/Misc/Missile ")

var damage: float;							// Damage to collided objects
var destroyOnCollision: boolean = true;		// Destroy immediatelly after any collision
var fxPrefab : GameObject;					// Game object  with some efects (like  explosion). Keep empty if it isn't needed
var multiFx : boolean = true;				// If true - generate different FX (from fxPrefab) in all collision points
var explosible: boolean = false;			// Should be expanded (to simmulate explosion) or not
var explosionSize: float;					// How big explosion should be (related to objects collision  size)


//========================================================================================================
// Process collision
function OnCollisionEnter(collision : Collision) 
{
   
   // Generate  visual effects if fxPrefab exist
    if (fxPrefab)
    {
		     // Rotate the object so that the y-axis faces along the normal of the surface
		    var contact : ContactPoint = collision.contacts[0];
		    var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal);
		    var pos : Vector3 = contact.point;
		 
		     Instantiate(fxPrefab, pos, rot);
		     fxPrefab.SetActive(true);
		     if (!multiFx) fxPrefab = null;
    }
    // else
	  //  Debug.Log("fxPrefab object is missed! Check: " + gameObject.name);

  
  // Expand collision box if  explosible = true
  if (explosible)
  {
     if (renderer) renderer.enabled = false;
      else transform.GetChild(0).gameObject.SetActive(false);
  
   // collider.transform.localScale = explosionSize;
    (collider as SphereCollider).radius = explosionSize;
    yield WaitForEndOfFrame();
    
    if (rigidbody) rigidbody.constraints = RigidbodyConstraints.FreezeAll;
    // Apply damage to all objects in collision, those  have MaterialGeneric script
    if(collision.collider.GetComponent(MaterialGeneric)) collision.collider.GetComponent(MaterialGeneric).applyDamage(damage);
    
    yield WaitForEndOfFrame();
    Destroy (gameObject);
  }
  
  
  // Destroy object immediatelly if destroyOnCollision=true
     if (destroyOnCollision) Destroy (gameObject);
}

//---------------------------------------------------------------------------------------------------------	
 // Set damage level
function setDamage (damageValue: float )
{
  damage = damageValue;
}
//---------------------------------------------------------------------------------------------------------	