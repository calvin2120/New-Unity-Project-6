using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {

	public Spawn spawn;
	public Leveler leveler;



	void Start () {

		// get player cube at levels begining
		spawn.player = GameObject.FindGameObjectWithTag("Player");
		// set spawnpoint as this transform if checked
		spawn.spawnPoint = transform;
		// get batteries in level
		leveler.batteries = GameObject.FindGameObjectsWithTag("battery");
	}
	



	public void HitSomething(){
		Die();
	}

	void Die(){
		spawn.Respawn();
		// reset batteries
		leveler.ResetBatteries();
	}

	public void ScoreBattery(){
		leveler.batteriesCollected ++;
	}



}


[System.Serializable]
public class Spawn {
	public GameObject player;
	public bool selfAsSpawnPoint = true;
	public Transform spawnPoint;

	public void Respawn(){
		player.rigidbody.velocity = new Vector3(0f,0f,0f);
		player.transform.position = spawnPoint.position;
		player.transform.rotation = spawnPoint.rotation;
	}
}



[System.Serializable]
public class Leveler {

	public string nextLevel;
	public GameObject[] batteries;
	public int batteriesCollected;

	public void GoToNextLevlel(){
		// load next level if we have all the baterries
		if(batteriesCollected == batteries.Length){
		Application.LoadLevel(nextLevel);
		}
	}

	public void ResetBatteries(){
		// reset all the batteries back to on position
		foreach(GameObject b in batteries){
			b.SendMessage("TurnOn",0f);
		}
		// reset bateries collected back to nothing
		batteriesCollected = 0;
	}	

}

