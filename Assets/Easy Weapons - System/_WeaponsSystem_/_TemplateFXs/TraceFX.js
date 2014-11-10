#pragma strict
@script RequireComponent(LineRenderer)


var ActivityTime: float = 0.1;
var minZ:float;
var maxZ:float;
var speed:float;

private var Trace: LineRenderer;
private var RemainActivityTime: float;
private var z:float;

//========================================================================================================
function Start () 
{
  Trace = gameObject.GetComponent(LineRenderer);
  z = minZ;
  RemainActivityTime = Time.time+ActivityTime;
}

//---------------------------------------------------------------------------------------------------------	
function Update () 
{
   if (RemainActivityTime <= Time.time)
      {
        if(z<maxZ) z+=speed; else 
         {
          z = minZ;
          gameObject.SetActive(false);
          RemainActivityTime = Time.time+ActivityTime;
         }
        Trace.SetPosition(1, Vector3(0,0,z));
      }
    
}

//---------------------------------------------------------------------------------------------------------	
function OnEnable () 
{
  z = minZ;
}
//---------------------------------------------------------------------------------------------------------	