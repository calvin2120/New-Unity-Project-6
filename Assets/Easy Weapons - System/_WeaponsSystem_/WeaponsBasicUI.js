//---------------------------------------------------------------------------------------------------------	
// Create basic version of Weapon UI (Ammo, list of weapons, buttons for mobile)
//---------------------------------------------------------------------------------------------------------	

#pragma strict

@script AddComponentMenu ("EasyWeapons/WeaponManager UI")
@script RequireComponent(WeaponManager)


var guiSkin: GUISkin;
var primaryAmmoText: GUIText;
var secondaryAmmoText: GUIText;

private var weaponManager: WeaponManager;
private var currentWeapon: WeaponClass;


//========================================================================================================
// Init
function Start () 
{
  weaponManager = GetComponent(WeaponManager);
}

//---------------------------------------------------------------------------------------------------------	
// Draw Ammo GUI
function Update () 
{
  currentWeapon = weaponManager.weapons[weaponManager.activeWeapon];
  
  primaryAmmoText.text = currentWeapon.weaponScript.ammo.currentAmmoInHolder.ToString() + "/" + currentWeapon.weaponScript.ammo.currentHoldersNum.ToString();
  if(currentWeapon.secondaryWeaponScript) secondaryAmmoText.text = currentWeapon.secondaryWeaponScript.ammo.currentAmmoInHolder.ToString() + "/" + currentWeapon.secondaryWeaponScript.ammo.currentHoldersNum.ToString();
    else secondaryAmmoText.text = "";
}

//---------------------------------------------------------------------------------------------------------	
// Create GUI and handle it
function OnGUI () 
{
GUI.skin = guiSkin;

 // Create visual list of Weapons
   for (var i=0; i<weaponManager.weapons.length; i++)
      if(weaponManager.weapons[i].weaponScript.ammo.isEnoughAmmo() || (weaponManager.weapons[i].secondaryWeaponScript && weaponManager.weapons[i].secondaryWeaponScript.ammo.isEnoughAmmo()) ) 
          if (i != weaponManager.activeWeapon) GUI.Button(Rect(120*i,0,120,30), (i+1).ToString() + ": " + weaponManager.weapons[i].caption);
             else GUI.Button(Rect(120*i,0,120,50), (i+1).ToString() + ": " + weaponManager.weapons[i].caption);
             
             
// Create GUI and handle it for devices ith touch input
#if UNITY_IPHONE || UNITY_ANDROID || UNITY_WP8 || UNITY_BLACKBERRY
 if(weaponManager.weapons.length>0)
 {
  // Shoot from main weapon	
   if (GUI.RepeatButton (Rect(Screen.width-150,Screen.height-50,100,50),"Fire")) 
  	     currentWeapon.weaponScript.Fire();
  	     
  // Shoot from secondary weapon, if it's  exists
   if (weaponManager.weapons[weaponManager.activeWeapon].secondaryWeaponScript)	
     if (GUI.RepeatButton (Rect(Screen.width-100,Screen.height-100,100,50),"2 Fire")) 
           currentWeapon.weaponScript.secondaryWeaponScript.Fire();
			 
  // Reload		 
   if (GUI.RepeatButton(Rect(Screen.width-50,Screen.height-50,50,50),"reload")) 			 
			currentWeapon.weaponScript.ForcedReload();
			 
			 
 // Change weapon
  for (var i=0; i<weaponManager.weapons.length; i++)
     if (GUI.Button(Rect(55*i,0,50,50),i.ToString())) 
         if (weaponManager.weapons[i].enabled) weaponManager.ChangeWeapon (i);
 }
   else 
   		Debug.Log ("There are no weapons attached to WeaponManager. Please check object: " + gameObject.name);
#endif 
     
}

//---------------------------------------------------------------------------------------------------------	
