//---------------------------------------------------------------------------------------------------------	
// Play sound according to weapon state { none, idle, fire, reload }
// Should be used with WeaponGeneric script
// Object should  have AudioSource component
//---------------------------------------------------------------------------------------------------------	 

#pragma strict
@script AddComponentMenu ("EasyWeapons/WeaponFX/WeaponSound")
@script RequireComponent(AudioSource)
@script RequireComponent(WeaponGeneric)

var idleSound: AudioClip;	
var fireSound: AudioClip;
var reloadSound: AudioClip;

var breakFireSound: boolean = true;
var forceIdle: boolean = false;

private var weaponScript: WeaponGeneric;
private var weaponStatus: WeaponStatus;


//========================================================================================================
// Initialize
function Start () 
{
 weaponScript = gameObject.GetComponent(WeaponGeneric);
 audio.playOnAwake = false;
 
}

//---------------------------------------------------------------------------------------------------------	
// Process sounds according to weapon state
function Update () 
{

// Get state from WeaponGeneric script
 weaponStatus = weaponScript.weaponStatus;
 
// Play sound according to weapon state (if audio exists)
 if (audio)
  switch (weaponStatus)
  {
    case WeaponStatus.idle:
     if (!audio.isPlaying)
      {
        audio.clip = idleSound;
        audio.Play();
     }
     else
       if (forceIdle) audio.Stop();
       
    break;
    
    case WeaponStatus.fire:
        if (breakFireSound)
           {
       		audio.clip = fireSound;
        	audio.Play();
           }
          else
          if (!audio.isPlaying)
           {
       		audio.clip = fireSound;
        	audio.Play();
           }
    break;
    
    
    case WeaponStatus.reload:
     if (!audio.isPlaying || audio.clip != reloadSound)
      {
        audio.clip = reloadSound;
        audio.Play();
     }
    break;
  }
 
}
//---------------------------------------------------------------------------------------------------------	