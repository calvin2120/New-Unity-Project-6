var muff : GameObject;
var muffSpeed = 1.0;	
var muffRotation: Vector3;
var activateOnAwake: boolean = false;
private var nextFire = 0.0;

//========================================================================================================
function Start () {
  if (activateOnAwake) Activate ();
}

//---------------------------------------------------------------------------------------------------------	
function Activate () {

   var muffClone : GameObject = Instantiate(muff, transform.position, transform.rotation);
   muffClone.SetActive(true);
   muffClone.transform.Rotate(muffRotation);
   if (muffClone.rigidbody) muffClone.rigidbody.velocity = transform.forward * muffSpeed;
}

//---------------------------------------------------------------------------------------------------------	