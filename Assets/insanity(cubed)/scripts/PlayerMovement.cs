﻿using UnityEngine;
using System.Collections;

public class PlayerMovement : MonoBehaviour {
	public float moveSpeed;
	private float maxSpeed = 5f; 
	
	private Vector3 input; 
	
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		input = new Vector3 (Input.GetAxisRaw ("Horizontal"), 0, Input.GetAxisRaw ("Vertical"));

		
	}

	// put your physics stuff here
	void FixedUpdate(){
		if (rigidbody.velocity.magnitude < maxSpeed) 
			
		{
			rigidbody.AddForce (input * moveSpeed);
		}
	}
}