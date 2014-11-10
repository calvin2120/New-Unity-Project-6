//---------------------------------------------------------------------------------------------------------	
// Script to manage weapons. Fire, Reload, etc  commands  come to WeaponGeneric scripts from this one
// Each weapon should have at least WeaponGeneric script
// Here you can setup all weapons, relevant buttons
//---------------------------------------------------------------------------------------------------------	

#pragma strict
@script AddComponentMenu ("EasyWeapons/WeaponManager ")

class WeaponClass
{ 
  var caption: String;
  var weaponScript: WeaponGeneric;  			// Primary weapon object	
  var secondaryWeaponScript: WeaponGeneric;		// Secondary weapon object attached to main (like  grenade launcher for M16)
  var activationKey: KeyCode;					// Key to activate weapon if it's enabled
  var enabled: boolean = true;					// Disable weapon if needed. For examle - if it  haven't  been pickuped yet
}

var weapons: WeaponClass[];						// Array of all weapons
var activeWeapon: int=0;						// Index of active weapon
var fireKey: KeyCode = KeyCode.Mouse0; 			// Button to fire
var secondaryFireKey: KeyCode = KeyCode.Mouse1; // Button to secondary fire
var reloadKey: KeyCode = KeyCode.R; 			// Button to reload
var isFPS: boolean = true;


//========================================================================================================
// Init
function Start () 
{
 // Hide all weapons and attach them to Weapon manager object
  if (weapons.length>0)
  {
   for (var i=0; i<weapons.length; i++)
     {
      weapons[i].weaponScript.getGameObject().transform.parent = gameObject.transform;
      weapons[i].weaponScript.getGameObject().SetActive(false);
     }
     
     
    weapons[activeWeapon].weaponScript.getGameObject().SetActive(true);
   }
   else 
   		Debug.Log ("There are no weapons attached to WeaponManager. Please check object: " + gameObject.name);
   		
   if (isFPS)
     {
       Screen.lockCursor = true;
       Screen.showCursor = false;
     }
}

//---------------------------------------------------------------------------------------------------------	
function Update () 
{
#if UNITY_STANDALONE_OSX || UNITY_STANDALONE_WIN || UNITY_WEBPLAYER || UNITY_FLASH || UNITY_EDITOR || UNITY_STANDALONE_LINUX
 if (weapons.length>0)
  {
   // Shoot from secondary weapon, if it's  exists
    if (weapons[activeWeapon].secondaryWeaponScript && Input.GetKey(secondaryFireKey))
			 weapons[activeWeapon].secondaryWeaponScript.Fire();
			 
 // Shoot from main weapon			 
    if (Input.GetKey(fireKey))
			 weapons[activeWeapon].weaponScript.Fire();
      else
 // Reload
   if (Input.GetKeyUp(reloadKey))
			 weapons[activeWeapon].weaponScript.ForcedReload();
      else
 // Change weapon
    if(Input.anyKeyDown)
      for (var i=0; i<weapons.length; i++)
         if (Input.GetKey(weapons[i].activationKey) && weapons[i].enabled) ChangeWeapon (i);
         
     if(!weapons[activeWeapon].weaponScript.ammo.isEnoughAmmo()) 
     	for (i=0; i<weapons.length; i++)  
     	 if (weapons[i].enabled)
     	  { 
     	    ChangeWeapon (i);
     	    break;
     	  }
  }
   else 
   		Debug.Log ("There are no weapons attached to WeaponManager. Please check object: " + gameObject.name);
 #endif 
}

//---------------------------------------------------------------------------------------------------------	
 // Change weapon to another one enabled
function ChangeWeapon ( weaponIndex: int) 
{
   if (!weapons[weaponIndex].weaponScript.getGameObject().activeSelf  &&  weapons[weaponIndex].weaponScript.ammo.isEnoughAmmo())
   {
     weapons[activeWeapon].weaponScript.getGameObject().SetActive(false);
     activeWeapon = weaponIndex;
     weapons[activeWeapon].weaponScript.getGameObject().SetActive(true);
   }
}

//---------------------------------------------------------------------------------------------------------	
	