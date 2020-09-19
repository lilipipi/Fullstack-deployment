resource "aws_instance" "sept_assignment" {
  ami                    = var.ami_id
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.private_az1.id
  vpc_security_group_ids = [aws_security_group.allow_http_ssh.id]

  key_name = aws_key_pair.deployer.key_name
}

data "template_file" "inventory" {
  template = "${file("./inventory.tpl")}"

  vars = {
    public_ip = aws_instance.sept_assignment.public_ip
  }
}

resource "local_file" "save_inventory" {
  content  = data.template_file.inventory.rendered
  filename = "../ansible/inventory.yml"
}
