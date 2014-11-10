#pragma strict

var scaleParam: float = 0.5;
var scaleVector: Vector3 = Vector3.one;
var rotationSpeed: float = 0.5;

//========================================================================================================
function Update () 
{
	transform.localScale = scaleVector * Random.Range(scaleParam, scaleParam*3);
	transform.localEulerAngles.z = Random.Range(0,90.0 * rotationSpeed);
}

//---------------------------------------------------------------------------------------------------------	