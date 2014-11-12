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
	}
	



	void HitSomething(){
		Die();
	}

	void Die(){
		spawn.Respawn();
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

	public void GoToNextLevlel(){
		Application.LoadLevel(nextLevel);
	}
}

