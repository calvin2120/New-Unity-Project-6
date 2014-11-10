//---------------------------------------------------------------------------------------------------------	
// Service class for Weapon system (used in WeaponGeneric script)
// Consist all info about ammo. Process ammo decreasing and adding.
//---------------------------------------------------------------------------------------------------------	

#pragma strict


class AmmoHolder
{
  var maxHolders: int;			      // Max available number of ammo-packs
  var maxInHolder: int;			 	  // Max available number of bullets in ammo-packs
  var currentHoldersNum: int = 1; 	  // Current number of ammo-packs
  var currentAmmoInHolder: int = 10;  // Current number of bullets in ammo-packs
  var inReload: boolean = false;      // True if ammo-pack have been replaced on new one
	
	
//-----------------------------------------------------------------------------------------	
// return true if there any ammo at all
  function isEnoughAmmo ():boolean
	{
	  if(currentHoldersNum>0  &&  currentAmmoInHolder>0)  return true;
	   else return false;
	}
	
	
//-----------------------------------------------------------------------------------------	
// Increase ammo by 1 or by custom amount
  	function incAmmo ()
	{
	  if(currentAmmoInHolder==0) inReload = true;
	  if(currentAmmoInHolder<maxInHolder)  currentAmmoInHolder++; 
	}
	
	
	function incAmmo (amount:int)
	{
	  if(currentAmmoInHolder==0) inReload = true;
	  if(currentAmmoInHolder<maxInHolder)  currentAmmoInHolder+=amount; 
	}

//-----------------------------------------------------------------------------------------	
// Decrease ammo by 1 or by custom amount
	function decAmmo ()
	{
	
	  if(currentAmmoInHolder>0) currentAmmoInHolder--;
	  if(currentAmmoInHolder==0) 
	     {
	       delHolder ();
	       if(currentHoldersNum>0) currentAmmoInHolder = maxInHolder;
	     }  
	}
	
	
	
	function decAmmo (amount:int)
	{
	
	  if(currentAmmoInHolder>0) currentAmmoInHolder-=amount;  
	  	 if(currentAmmoInHolder<=0) 
	     {
	       delHolder ();
	       if(currentHoldersNum>0) currentAmmoInHolder = maxInHolder;
	     }  
	}
	
	
//-----------------------------------------------------------------------------------------		
// Increase ammo-packs quantity by 1 or by custom amount
	function addHolder ()
	{
	  if(currentHoldersNum==0) inReload = true;
	  if(currentHoldersNum<maxHolders)  currentHoldersNum++; 
	}
	
	
	function addHolder (amount:int)
	{
	  if(currentHoldersNum==0) inReload = true;
	  if(currentHoldersNum<maxHolders)  currentHoldersNum+=amount; 
	}


//-----------------------------------------------------------------------------------------	
// Decrease ammo-packs quantity by 1 or by custom amount
	function delHolder ()
	{
	  if(currentHoldersNum>0) currentHoldersNum--; 
	  if(currentHoldersNum>0) inReload = true; 
	}
	  
	
	function delHolder (amount:int)
	{
	  if(currentHoldersNum>0) currentHoldersNum-=amount;  
	  if(currentHoldersNum>0) 
	  inReload = true;
	}
	
//-----------------------------------------------------------------------------------------	
}