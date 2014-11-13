using UnityEngine;
using System.Collections;

public class Battery : MonoBehaviour {

	public BatteryState batteryState;
	public BatteryStateVariable onVar;
	public BatteryStateVariable offVar;

	public GameManager gameManager;

	
	// Use this for initialization
	void Start () {
		// grab the game manager in start
		gameManager = GameObject.FindGameObjectWithTag("GameManager").GetComponent<GameManager>();
	}
	
	
	void OnCollisionEnter (Collision col) {
		// test if the colliding object is the players cube
		if(col.collider.tag == "Player"){
			TurnOff();
		}
	}

	public void TurnOff(){
		// if already off ignore
		if(batteryState == BatteryState.off){
			return;
		}
		// switch the state of the battery
		batteryState = BatteryState.off;
		// change the material
		renderer.material = offVar.mat;
		// tell the game manager you got a battery
		gameManager.ScoreBattery();
	}

	public void TurnOn(){
		// switch the state of the battery
		batteryState = BatteryState.on;
		// change the material
		renderer.material = onVar.mat;
	}
}


[System.Serializable]
public class BatteryStateVariable{
	public MeshFilter mesh;
	public Material mat;
}

[System.Serializable]
public enum BatteryState{
	on,off
}



