//---------------------------------------------------------------------------------------------------------	
// Animate weapon according to it state { none, idle, fire, reload }
// Should be used with WeaponGeneric script
// Object should  have Animation component
//---------------------------------------------------------------------------------------------------------	

#pragma strict
@script AddComponentMenu ("EasyWeapons/WeaponFX/Weapon Animation ")
@script RequireComponent(Animation)
@script RequireComponent(WeaponGeneric)


var idleAnimation: AnimationClip;    // name of idle animation
var fireAnimation: AnimationClip;    // name of fire animation
var reloadAnimation: AnimationClip;  // name of reload animation

private var weaponScript: WeaponGeneric;
private var weaponStatus: WeaponStatus;


//========================================================================================================
// Initialize
function Start () 
{
  weaponScript = gameObject.GetComponent(WeaponGeneric);
}

//---------------------------------------------------------------------------------------------------------	
// Process animation according to weapon state
function Update () 
{

// Get state from WeaponGeneric script
 weaponStatus = weaponScript.weaponStatus;
 
// Play animation according to weapon state (if animation exists)
 if (animation)
  switch (weaponStatus)
  {
    case WeaponStatus.idle:
         if(idleAnimation) animation.CrossFadeQueued(idleAnimation.name, 0.3, QueueMode.CompleteOthers);
    break;
    
    case WeaponStatus.fire:
    if(fireAnimation)
     {
      if (animation.IsPlaying(fireAnimation.name)) animation.Rewind(fireAnimation.name);
          animation.Play(fireAnimation.name);
     }
    break;
    
    
    case WeaponStatus.reload:
       if(reloadAnimation) animation.Play(reloadAnimation.name);
    break;
  }
  
}
//---------------------------------------------------------------------------------------------------------	