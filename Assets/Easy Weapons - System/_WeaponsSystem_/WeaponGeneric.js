// MAIN SCRIPT for whole Shooting/Weapon system. Configure your weapon here
// Can works both for FPS and TPS, support different types of weapons etc
// You need to use MaterialGeneric script for proper damage applying and  decals generation
// autor: Alexander birzul @ 2012 

#pragma strict
@script AddComponentMenu ("EasyWeapons/WeaponGeneric")


public enum WeaponStatus { none, idle, fire, reload }  // Weapon status enum
public enum WeaponType { projective, missile }		   // missile - weapon produce object(like grenade), projective - use raytrace

var ammo: AmmoHolder;           // Ammo 
var type: WeaponType;		    // Type of weapon
var isFPS: boolean = true;	    // For "projective" weapons only. Set true  to raycast from the center of the screen
var fireRate: float = 0.5;      // Frequency of fire/bullet generation
var ReloadTime: float;          // How much time will reloading obtain
var spread: float;			    // How much will deviate hit position from aim

var damage: float = 1; 	  	    // Damage to enemy
var distance: float = 0; 	    // Effective distance
var missile: Rigidbody;		    // Generated object. For "missile" weapons only
var missileSpeed: float;	    // Initial speed of generated object. For "missile" weapons only
var createDecals: boolean;	    // Try to leave  deals on damaged object

var customEmmiter: Transform;   // Put custom object  here, and  bulets wil come  from it position
var weaponStatus: WeaponStatus; // Current weapon status { none, idle, fire, reload }


private var emmitionTransform: Transform;
private var nextFire = 0.0;
private var shootingRay: Ray;


//========================================================================================================
function Start () 
{
  if (distance<=0) distance = Mathf.Infinity;
  if (customEmmiter) emmitionTransform = customEmmiter;
      else
        emmitionTransform = transform;
  
  weaponStatus = WeaponStatus.idle;
}
//---------------------------------------------------------------------------------------------------------	
function Update () 
{
   if(Time.time > nextFire) weaponStatus = WeaponStatus.idle;   
  
 // Fire not faster then fireRate specifies
   if(ammo.inReload && nextFire<Time.time)   
   {
      weaponStatus = WeaponStatus.reload;
      
      nextFire += ReloadTime;
      ammo.inReload = false;
   } 
}
//---------------------------------------------------------------------------------------------------------	
function Fire () 
{
 // Put weapon in reload state if ammo clip is empty
   if (ammo.inReload) 
   {
      weaponStatus = WeaponStatus.reload;
      
      nextFire += ReloadTime;
      ammo.inReload = false;
   } 

  
 // Shoot if everything is ok 
 if ( ammo.isEnoughAmmo() && Time.time > nextFire) 
 {
   weaponStatus = WeaponStatus.fire;
   
	  switch (type)
	  {
          
	     case WeaponType.missile: // for missile weapons - create  new object from missile object
	          if(missile)
	          {
		       var missileInstance : Rigidbody = Instantiate(missile, emmitionTransform.position , emmitionTransform.rotation);
		       missileInstance.gameObject.SetActive(true);
	           missileInstance.velocity = (emmitionTransform.forward+Random.insideUnitSphere * spread) * missileSpeed;
	           if (missileInstance.GetComponent(Missile)) missileInstance.GetComponent(Missile).setDamage(damage);
	          }
	           else
	              Debug.Log("Bullet object is missed! Check: " + gameObject.name);
		      break;
		      
		      
	     case WeaponType.projective: // for projective weapons - create ray from object position or  from the  center of the Screen (if is FPS)
	
			   if (isFPS)  
			     {
			      shootingRay = Camera.main.ScreenPointToRay ( Vector3(Camera.main.pixelWidth/2, Camera.main.pixelHeight/2,0));	
			      shootingRay.direction = (shootingRay.direction+Random.insideUnitSphere * spread).normalized;
			     }
			      else
			       {
			        shootingRay.origin =  emmitionTransform.position;	
			   		shootingRay.direction = (emmitionTransform.forward+Random.insideUnitSphere * spread).normalized;
			   	   }
		
			      var hitInfo : RaycastHit;
			      if (Physics.Raycast( shootingRay, hitInfo, distance)) 
			            {
			              if(hitInfo.collider.GetComponent(MaterialGeneric)) hitInfo.collider.GetComponent(MaterialGeneric).applyDamage(damage, hitInfo, createDecals);
			               Debug.DrawRay(shootingRay.origin, shootingRay.direction * distance, Color.red);
						}
    		break;
	  
	  }
   
   
   // Activate WeaponFX scripts in attached/child objects
    BroadcastMessage ("Activate",SendMessageOptions.DontRequireReceiver);
   
   // Prepare for next shoot and decrease ammo
    nextFire = Time.time + fireRate;
    ammo.decAmmo();

  }
  
  yield WaitForEndOfFrame();
  weaponStatus = WeaponStatus.none;
}

//---------------------------------------------------------------------------------------------------------	
function getGameObject (): GameObject 
{
  // Get current game object
   return gameObject;
}

//----------------------------------------------------------------------------------------------------------		
function ForcedReload ()
{
 // Forced reload if enough ammo
  if(ammo.isEnoughAmmo() && !ammo.inReload && ammo.currentAmmoInHolder< ammo.maxInHolder) 
   {
    ammo.decAmmo (ammo.maxInHolder);
    ammo.inReload = true;
   }
}
//----------------------------------------------------------------------------------------------------------
