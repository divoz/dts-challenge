import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, "DefaultVpc", {
      isDefault: true,
    });

    const securityGroup = new ec2.SecurityGroup(this, "TaskManagerSG", {
      vpc,
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), "SSH");

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(3000),
      "Next.js App",
    );

    const instanceRole = new iam.Role(this, "TaskManagerInstanceRole", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
    });
    instanceRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["ssm:GetParameter"],
        resources: [
          "arn:aws:ssm:eu-west-2:888054366285:parameter/task-manager/database-url",
        ],
      }),
    );

    const instance = new ec2.Instance(this, "TaskManagerInstance", {
      vpc,
      instanceType: new ec2.InstanceType("t3.micro"),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup,
      keyName: "task-manager-key",
      role: instanceRole,
    });
  }
}
