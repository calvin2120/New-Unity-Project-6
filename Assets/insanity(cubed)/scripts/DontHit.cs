using UnityEngine;
using System.Collections;

public class DontHit : MonoBehaviour {

	public GameManager gameManager;

	// Use this for initialization
	void Start () {
		// grab the game manager in start
		gameManager = GameObject.FindGameObjectWithTag("GameManager").GetComponent<GameManager>();
	}
	

	void OnCollisionEnter (Collision col) {
		// test if the colliding object is the players cube
		if(col.collider.tag == "Player"){
			gameManager.HitSomething();
		}
	}
}
