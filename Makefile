ansible-run:
	cd ansible && bash run_ansible.sh
	
up:
	cd infra && terraform apply --auto-approve

down:
	cd infra && terraform destroy --auto-approve
