// curriculum-section-shortlist.js - 20 x Azure DevOps Shortlist Review

const shortlistPrepper = {
  title: 'Minicourse Azure DevOps Recapper',
  description: 'DevOps, CI/CD, AKS, Terraform, IAC, and more.',
  lessons: [
    {
      title: '20 Essential Azure and DevOps Concepts',
      description:
        'A comprehensive review of the most critical Azure and DevOps concepts for containerized applications, covering cloud fundamentals, containerization, infrastructure as code, and CI/CD pipelines.',
      sections: [
        {
          title: 'Azure and Cloud Fundamentals (5 Key Concepts)',
          explanation: `
        <p>These five fundamental concepts form the foundation of Azure cloud services and architecture:</p>

        <h4>1. Azure App Services and Deployment Models</h4>
        <p>Azure App Service is a fully managed platform for building, deploying, and scaling web applications:</p>

        <p><strong>Key Features:</strong></p>
        <ul>
          <li>PaaS (Platform as a Service) offering that abstracts infrastructure management</li>
          <li>Support for multiple languages and frameworks (.NET, Java, Node.js, Python, PHP)</li>
          <li>Automatic scaling and load balancing capabilities</li>
          <li>Built-in CI/CD integration and deployment slots for zero-downtime releases</li>
          <li>Managed TLS/SSL certificates and custom domains</li>
        </ul>

        <p><strong>Deployment Models:</strong></p>
        <ul>
          <li><strong>Service Plans</strong>: Define the region, size, and features for your applications</li>
          <li><strong>Deployment Slots</strong>: Separate environments for staging and production</li>
          <li><strong>Continuous Deployment</strong>: Integration with Azure DevOps, GitHub, or other source control</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Azure CLI commands for App Service deployment
# Create a resource group
az group create --name myResourceGroup --location eastus

# Create an App Service plan
az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku S1

# Create a web app
az webapp create --name myWebApp --resource-group myResourceGroup --plan myAppServicePlan

# Deploy code from a Git repository
az webapp deployment source config --name myWebApp --resource-group myResourceGroup \
  --repo-url https://github.com/username/repo --branch main --manual-integration

# Create and configure a deployment slot
az webapp deployment slot create --name myWebApp --resource-group myResourceGroup \
  --slot staging

# Swap deployment slots (promote staging to production)
az webapp deployment slot swap --name myWebApp --resource-group myResourceGroup \
  --slot staging --target-slot production</code></pre>
        </div>

        <h4>2. Azure Networking and Security</h4>
        <p>Azure networking services provide connectivity between resources, to the internet, and secure access to applications:</p>

        <p><strong>Key Networking Components:</strong></p>
        <ul>
          <li><strong>Virtual Networks (VNets)</strong>: Isolated network environments in Azure</li>
          <li><strong>Subnets</strong>: Segments within VNets to organize and secure resources</li>
          <li><strong>Network Security Groups (NSGs)</strong>: Virtual firewalls to filter traffic</li>
          <li><strong>Load Balancers</strong>: Distribute traffic across multiple servers</li>
          <li><strong>Application Gateways</strong>: Web traffic load balancer with advanced routing</li>
          <li><strong>VPN Gateway & ExpressRoute</strong>: Secure connections between on-premises and Azure</li>
        </ul>

        <p><strong>Security Services:</strong></p>
        <ul>
          <li><strong>Azure Key Vault</strong>: Secure storage for keys, secrets, and certificates</li>
          <li><strong>Azure Active Directory (AAD)</strong>: Identity and access management</li>
          <li><strong>Azure Security Center</strong>: Unified security management and threat protection</li>
          <li><strong>Azure DDoS Protection</strong>: Protection against distributed denial-of-service attacks</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Azure CLI commands for networking and security setup
# Create a virtual network with a subnet
az network vnet create --name myVNet --resource-group myResourceGroup \
  --address-prefix 10.0.0.0/16 --subnet-name mySubnet --subnet-prefix 10.0.1.0/24

# Create a network security group
az network nsg create --name myNSG --resource-group myResourceGroup

# Add an inbound rule to allow HTTP traffic
az network nsg rule create --name Allow-HTTP --nsg-name myNSG --resource-group myResourceGroup \
  --priority 1000 --direction Inbound --access Allow --protocol Tcp \
  --source-address-prefix '*' --source-port-range '*' \
  --destination-address-prefix '*' --destination-port-range 80

# Associate NSG with a subnet
az network vnet subnet update --name mySubnet --resource-group myResourceGroup \
  --vnet-name myVNet --network-security-group myNSG

# Create a key vault
az keyvault create --name myKeyVault --resource-group myResourceGroup \
  --location eastus --sku standard

# Add a secret to key vault
az keyvault secret set --vault-name myKeyVault --name mySecret \
  --value "MySecretValue"

# Grant an app permission to access the key vault
az keyvault set-policy --name myKeyVault --spn <application-id> \
  --secret-permissions get list --key-permissions get list</code></pre>
        </div>

        <h4>3. Azure Storage and Databases</h4>
        <p>Azure provides multiple data storage options to support different application requirements:</p>

        <p><strong>Storage Services:</strong></p>
        <ul>
          <li><strong>Azure Blob Storage</strong>: For unstructured data like documents, images, and videos</li>
          <li><strong>Azure Files</strong>: Fully managed file shares accessible via SMB</li>
          <li><strong>Azure Table Storage</strong>: NoSQL key-attribute store for semi-structured data</li>
          <li><strong>Azure Queue Storage</strong>: For messaging between application components</li>
          <li><strong>Azure Disk Storage</strong>: Persistent block storage for Azure VMs</li>
        </ul>

        <p><strong>Database Services:</strong></p>
        <ul>
          <li><strong>Azure SQL Database</strong>: Managed relational database based on SQL Server</li>
          <li><strong>Azure Cosmos DB</strong>: Globally distributed, multi-model database</li>
          <li><strong>Azure Database for MySQL/PostgreSQL/MariaDB</strong>: Managed open-source databases</li>
          <li><strong>Azure Cache for Redis</strong>: In-memory data store for caching and session state</li>
          <li><strong>Azure Synapse Analytics</strong>: Enterprise data warehouse for big data analytics</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Azure CLI commands for storage and database setup
# Create a storage account
az storage account create --name mystorageaccount --resource-group myResourceGroup \
  --location eastus --sku Standard_LRS --kind StorageV2

# Create a container in blob storage
az storage container create --name mycontainer --account-name mystorageaccount

# Upload a file to blob storage
az storage blob upload --account-name mystorageaccount --container-name mycontainer \
  --name myblob --file /path/to/local/file

# Create an Azure SQL Database server
az sql server create --name mysqlserver --resource-group myResourceGroup \
  --location eastus --admin-user adminuser --admin-password P@ssw0rd1234

# Configure firewall rules
az sql server firewall-rule create --name AllowAll --server mysqlserver \
  --resource-group myResourceGroup --start-ip-address 0.0.0.0 --end-ip-address 255.255.255.255

# Create a database
az sql db create --name mydb --server mysqlserver --resource-group myResourceGroup \
  --edition Standard --service-objective S1

# Create a Cosmos DB account
az cosmosdb create --name mycosmosdb --resource-group myResourceGroup \
  --kind MongoDB --capabilities EnableMongo</code></pre>
        </div>

        <h4>4. Azure Resource Manager (ARM)</h4>
        <p>Azure Resource Manager (ARM) is the deployment and management service for Azure, providing a consistent management layer:</p>

        <p><strong>Key Concepts:</strong></p>
        <ul>
          <li><strong>Resource Groups</strong>: Logical containers for resources that share the same lifecycle</li>
          <li><strong>ARM Templates</strong>: JSON files that define infrastructure as code</li>
          <li><strong>Resource Providers</strong>: Services that supply Azure resources</li>
          <li><strong>Deployments</strong>: Operations that create or modify resources defined in templates</li>
          <li><strong>Tags</strong>: Metadata for organizing resources and managing costs</li>
        </ul>

        <p><strong>ARM Template Structure:</strong></p>
        <ul>
          <li><strong>Parameters</strong>: Values that can be provided during deployment</li>
          <li><strong>Variables</strong>: Values reused throughout the template</li>
          <li><strong>Resources</strong>: Azure resources to be deployed or updated</li>
          <li><strong>Outputs</strong>: Values returned after deployment</li>
          <li><strong>Functions</strong>: Operations to simplify template expressions</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Example ARM template for a web app and SQL database
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "webAppName": {
      "type": "string",
      "metadata": {
        "description": "Name of the Web App"
      }
    },
    "sqlServerName": {
      "type": "string",
      "metadata": {
        "description": "Name of the SQL Server"
      }
    },
    "sqlAdminLogin": {
      "type": "string",
      "metadata": {
        "description": "SQL Server admin username"
      }
    },
    "sqlAdminPassword": {
      "type": "securestring",
      "metadata": {
        "description": "SQL Server admin password"
      }
    }
  },
  "variables": {
    "hostingPlanName": "[concat(parameters('webAppName'), '-plan')]",
    "databaseName": "[concat(parameters('webAppName'), '-db')]"
  },
  "resources": [
    {
      "type": "Microsoft.Web/serverfarms",
      "apiVersion": "2020-06-01",
      "name": "[variables('hostingPlanName')]",
      "location": "[resourceGroup().location]",
      "sku": {
        "name": "S1",
        "tier": "Standard"
      }
    },
    {
      "type": "Microsoft.Web/sites",
      "apiVersion": "2020-06-01",
      "name": "[parameters('webAppName')]",
      "location": "[resourceGroup().location]",
      "dependsOn": [
        "[resourceId('Microsoft.Web/serverfarms', variables('hostingPlanName'))]"
      ],
      "properties": {
        "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', variables('hostingPlanName'))]"
      }
    },
    {
      "type": "Microsoft.Sql/servers",
      "apiVersion": "2020-02-02-preview",
      "name": "[parameters('sqlServerName')]",
      "location": "[resourceGroup().location]",
      "properties": {
        "administratorLogin": "[parameters('sqlAdminLogin')]",
        "administratorLoginPassword": "[parameters('sqlAdminPassword')]",
        "version": "12.0"
      },
      "resources": [
        {
          "type": "databases",
          "apiVersion": "2020-02-02-preview",
          "name": "[variables('databaseName')]",
          "location": "[resourceGroup().location]",
          "dependsOn": [
            "[resourceId('Microsoft.Sql/servers', parameters('sqlServerName'))]"
          ],
          "sku": {
            "name": "S1",
            "tier": "Standard"
          }
        },
        {
          "type": "firewallrules",
          "apiVersion": "2020-02-02-preview",
          "name": "AllowAllAzureIPs",
          "location": "[resourceGroup().location]",
          "dependsOn": [
            "[resourceId('Microsoft.Sql/servers', parameters('sqlServerName'))]"
          ],
          "properties": {
            "startIpAddress": "0.0.0.0",
            "endIpAddress": "0.0.0.0"
          }
        }
      ]
    }
  ],
  "outputs": {
    "webAppUrl": {
      "type": "string",
      "value": "[concat('https://', parameters('webAppName'), '.azurewebsites.net')]"
    },
    "sqlServerFqdn": {
      "type": "string",
      "value": "[reference(resourceId('Microsoft.Sql/servers', parameters('sqlServerName'))).fullyQualifiedDomainName]"
    }
  }
}</code></pre>
        </div>

        <h4>5. Azure Monitoring and Logging</h4>
        <p>Azure provides comprehensive monitoring and logging services to gain insights into application health and performance:</p>

        <p><strong>Key Monitoring Services:</strong></p>
        <ul>
          <li><strong>Azure Monitor</strong>: Collects, analyzes, and acts on telemetry from Azure resources</li>
          <li><strong>Application Insights</strong>: Application Performance Management (APM) service</li>
          <li><strong>Log Analytics</strong>: Tool for querying and analyzing log data</li>
          <li><strong>Azure Metrics</strong>: Time-series database for storing and querying numeric data</li>
          <li><strong>Azure Dashboard</strong>: Custom view of Azure resources</li>
        </ul>

        <p><strong>Key Capabilities:</strong></p>
        <ul>
          <li><strong>Health Monitoring</strong>: Track availability and performance of resources</li>
          <li><strong>Alerts</strong>: Notifications of significant conditions and automated responses</li>
          <li><strong>Autoscale</strong>: Dynamically adjust resources based on demand</li>
          <li><strong>Diagnostic Logs</strong>: Detailed logs for troubleshooting and auditing</li>
          <li><strong>Kusto Query Language (KQL)</strong>: Query language for log analytics</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Azure CLI commands for monitoring and logging setup
# Enable application insights for a web app
az monitor app-insights component create --app myAppInsights \
  --location eastus --resource-group myResourceGroup --application-type web

# Associate application insights with a web app
az webapp config appsettings set --name myWebApp --resource-group myResourceGroup \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=$(az monitor app-insights component show \
  --app myAppInsights --resource-group myResourceGroup --query instrumentationKey -o tsv)

# Create an alert rule
az monitor metrics alert create --name HighCpuAlert --resource-group myResourceGroup \
  --scopes $(az webapp show --name myWebApp --resource-group myResourceGroup --query id -o tsv) \
  --condition "avg Percentage CPU > 80" --window-size 5m --evaluation-frequency 1m \
  --severity 2

# Kusto Query Language (KQL) example for Log Analytics
# This query finds the top 10 most visited pages in an application
requests
| where timestamp > ago(24h)
| summarize count() by name
| top 10 by count_
| render barchart</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> When interviewing for Azure cloud positions, be prepared to explain the relationships between different Azure services and how they fit together in a complete architecture. Understanding resource groups, networking, and security fundamentals is crucial.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What factors would you consider when choosing between Azure App Service and AKS for application hosting?"</li>
            <li>"How would you secure secrets in an Azure-hosted application?"</li>
            <li>"Explain the difference between Azure Storage account types and when you would use each"</li>
            <li>"How would you monitor application performance in Azure?"</li>
            <li>"Describe an ARM template structure and how you would use it for consistent deployments"</li>
          </ul>
        </div>
      `,
          codeExample: `// ARM template for a complete microservice environment with networking, key vault, and monitoring
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "projectName": {
      "type": "string",
      "minLength": 3,
      "maxLength": 11,
      "metadata": {
        "description": "Project name prefix for all resources"
      }
    },
    "location": {
      "type": "string",
      "defaultValue": "[resourceGroup().location]",
      "metadata": {
        "description": "Location for all resources"
      }
    },
    "adminUsername": {
      "type": "string",
      "metadata": {
        "description": "Admin username for SQL Server"
      }
    },
    "adminPassword": {
      "type": "securestring",
      "metadata": {
        "description": "Admin password for SQL Server"
      }
    },
    "environmentType": {
      "type": "string",
      "allowedValues": [
        "dev",
        "test",
        "prod"
      ],
      "defaultValue": "dev",
      "metadata": {
        "description": "Environment type (dev, test, prod)"
      }
    }
  },
  "variables": {
    "uniqueSuffix": "[uniqueString(resourceGroup().id)]",
    "vnetName": "[concat(parameters('projectName'), '-vnet')]",
    "webSubnetName": "web-subnet",
    "apiSubnetName": "api-subnet",
    "dbSubnetName": "db-subnet",
    "nsgName": "[concat(parameters('projectName'), '-nsg')]",
    "webAppName": "[concat(parameters('projectName'), '-web-', parameters('environmentType'))]",
    "apiAppName": "[concat(parameters('projectName'), '-api-', parameters('environmentType'))]",
    "appServicePlanName": "[concat(parameters('projectName'), '-plan')]",
    "sqlServerName": "[concat(parameters('projectName'), '-sql-', variables('uniqueSuffix'))]",
    "sqlDBName": "[concat(parameters('projectName'), '-db')]",
    "keyVaultName": "[concat(parameters('projectName'), '-kv-', variables('uniqueSuffix'))]",
    "storageAccountName": "[concat(parameters('projectName'), 'stor', variables('uniqueSuffix'))]",
    "appInsightsName": "[concat(parameters('projectName'), '-ai')]",
    "logWorkspaceName": "[concat(parameters('projectName'), '-logs')]",
    "appServicePlanSku": {
      "dev": {
        "name": "B1",
        "tier": "Basic"
      },
      "test": {
        "name": "S1",
        "tier": "Standard"
      },
      "prod": {
        "name": "P1v2",
        "tier": "PremiumV2"
      }
    }
  },
  "resources": [
    {
      "type": "Microsoft.Network/virtualNetworks",
      "apiVersion": "2020-06-01",
      "name": "[variables('vnetName')]",
      "location": "[parameters('location')]",
      "properties": {
        "addressSpace": {
          "addressPrefixes": [
            "10.0.0.0/16"
          ]
        },
        "subnets": [
          {
            "name": "[variables('webSubnetName')]",
            "properties": {
              "addressPrefix": "10.0.1.0/24",
              "delegations": [
                {
                  "name": "delegation",
                  "properties": {
                    "serviceName": "Microsoft.Web/serverFarms"
                  }
                }
              ]
            }
          },
          {
            "name": "[variables('apiSubnetName')]",
            "properties": {
              "addressPrefix": "10.0.2.0/24",
              "delegations": [
                {
                  "name": "delegation",
                  "properties": {
                    "serviceName": "Microsoft.Web/serverFarms"
                  }
                }
              ]
            }
          },
          {
            "name": "[variables('dbSubnetName')]",
            "properties": {
              "addressPrefix": "10.0.3.0/24",
              "serviceEndpoints": [
                {
                  "service": "Microsoft.Sql"
                }
              ]
            }
          }
        ]
      }
    },
    {
      "type": "Microsoft.Network/networkSecurityGroups",
      "apiVersion": "2020-06-01",
      "name": "[variables('nsgName')]",
      "location": "[parameters('location')]",
      "properties": {
        "securityRules": [
          {
            "name": "Allow-HTTP",
            "properties": {
              "priority": 1000,
              "access": "Allow",
              "direction": "Inbound",
              "destinationPortRange": "80",
              "protocol": "Tcp",
              "sourceAddressPrefix": "*",
              "sourcePortRange": "*",
              "destinationAddressPrefix": "*"
            }
          },
          {
            "name": "Allow-HTTPS",
            "properties": {
              "priority": 1001,
              "access": "Allow",
              "direction": "Inbound",
              "destinationPortRange": "443",
              "protocol": "Tcp",
              "sourceAddressPrefix": "*",
              "sourcePortRange": "*",
              "destinationAddressPrefix": "*"
            }
          }
        ]
      }
    },
    {
      "type": "Microsoft.Web/serverfarms",
      "apiVersion": "2020-06-01",
      "name": "[variables('appServicePlanName')]",
      "location": "[parameters('location')]",
      "sku": "[variables('appServicePlanSku')[parameters('environmentType')]]",
      "properties": {}
    },
    {
      "type": "Microsoft.Web/sites",
      "apiVersion": "2020-06-01",
      "name": "[variables('webAppName')]",
      "location": "[parameters('location')]",
      "dependsOn": [
        "[resourceId('Microsoft.Web/serverfarms', variables('appServicePlanName'))]",
        "[resourceId('Microsoft.Insights/components', variables('appInsightsName'))]"
      ],
      "properties": {
        "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', variables('appServicePlanName'))]",
        "httpsOnly": true,
        "siteConfig": {
          "alwaysOn": true,
          "appSettings": [
            {
              "name": "APPINSIGHTS_INSTRUMENTATIONKEY",
              "value": "[reference(resourceId('Microsoft.Insights/components', variables('appInsightsName')), '2020-02-02').InstrumentationKey]"
            },
            {
              "name": "WEBSITE_NODE_DEFAULT_VERSION",
              "value": "~14"
            },
            {
              "name": "API_URL",
              "value": "[concat('https://', variables('apiAppName'), '.azurewebsites.net')]"
            },
            {
              "name": "AZURE_KEY_VAULT_ENDPOINT",
              "value": "[reference(resourceId('Microsoft.KeyVault/vaults', variables('keyVaultName')), '2019-09-01').vaultUri]"
            }
          ]
        }
      },
      "identity": {
        "type": "SystemAssigned"
      }
    },
    {
      "type": "Microsoft.Web/sites",
      "apiVersion": "2020-06-01",
      "name": "[variables('apiAppName')]",
      "location": "[parameters('location')]",
      "dependsOn": [
        "[resourceId('Microsoft.Web/serverfarms', variables('appServicePlanName'))]",
        "[resourceId('Microsoft.Insights/components', variables('appInsightsName'))]",
        "[resourceId('Microsoft.Sql/servers/databases', variables('sqlServerName'), variables('sqlDBName'))]"
      ],
      "properties": {
        "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', variables('appServicePlanName'))]",
        "httpsOnly": true,
        "siteConfig": {
          "alwaysOn": true,
          "appSettings": [
            {
              "name": "APPINSIGHTS_INSTRUMENTATIONKEY",
              "value": "[reference(resourceId('Microsoft.Insights/components', variables('appInsightsName')), '2020-02-02').InstrumentationKey]"
            },
            {
              "name": "WEBSITE_NODE_DEFAULT_VERSION",
              "value": "~14"
            },
            {
              "name": "AZURE_KEY_VAULT_ENDPOINT",
              "value": "[reference(resourceId('Microsoft.KeyVault/vaults', variables('keyVaultName')), '2019-09-01').vaultUri]"
            },
            {
              "name": "STORAGE_ACCOUNT_CONNECTION",
              "value": "[concat('@Microsoft.KeyVault(SecretUri=', reference(resourceId('Microsoft.KeyVault/vaults/secrets', variables('keyVaultName'), 'StorageAccountConnection')).secretUriWithVersion, ')')]"
            }
          ],
          "connectionStrings": [
            {
              "name": "DefaultConnection",
              "connectionString": "[concat('@Microsoft.KeyVault(SecretUri=', reference(resourceId('Microsoft.KeyVault/vaults/secrets', variables('keyVaultName'), 'SqlConnectionString')).secretUriWithVersion, ')')]",
              "type": "SQLAzure"
            }
          ]
        }
      },
      "identity": {
        "type": "SystemAssigned"
      }
    },
    {
      "type": "Microsoft.Sql/servers",
      "apiVersion": "2020-02-02-preview",
      "name": "[variables('sqlServerName')]",
      "location": "[parameters('location')]",
      "properties": {
        "administratorLogin": "[parameters('adminUsername')]",
        "administratorLoginPassword": "[parameters('adminPassword')]",
        "version": "12.0"
      },
      "resources": [
        {
          "type": "databases",
          "apiVersion": "2020-02-02-preview",
          "name": "[variables('sqlDBName')]",
          "location": "[parameters('location')]",
          "dependsOn": [
            "[resourceId('Microsoft.Sql/servers', variables('sqlServerName'))]"
          ],
          "sku": {
            "name": "[if(equals(parameters('environmentType'), 'prod'), 'S1', 'Basic')]",
            "tier": "[if(equals(parameters('environmentType'), 'prod'), 'Standard', 'Basic')]"
          },
          "properties": {
            "collation": "SQL_Latin1_General_CP1_CI_AS"
          }
        },
        {
          "type": "firewallrules",
          "apiVersion": "2020-02-02-preview",
          "name": "AllowAllAzureIPs",
          "dependsOn": [
            "[resourceId('Microsoft.Sql/servers', variables('sqlServerName'))]"
          ],
          "properties": {
            "startIpAddress": "0.0.0.0",
            "endIpAddress": "0.0.0.0"
          }
        }
      ]
    },
    {
      "type": "Microsoft.KeyVault/vaults",
      "apiVersion": "2019-09-01",
      "name": "[variables('keyVaultName')]",
      "location": "[parameters('location')]",
      "properties": {
        "enabledForDeployment": true,
        "enabledForTemplateDeployment": true,
        "enabledForDiskEncryption": true,
        "tenantId": "[subscription().tenantId]",
        "accessPolicies": [],
        "sku": {
          "name": "standard",
          "family": "A"
        }
      }
    },
    {
      "type": "Microsoft.KeyVault/vaults/secrets",
      "apiVersion": "2019-09-01",
      "name": "[concat(variables('keyVaultName'), '/SqlConnectionString')]",
      "dependsOn": [
        "[resourceId('Microsoft.KeyVault/vaults', variables('keyVaultName'))]",
        "[resourceId('Microsoft.Sql/servers/databases', variables('sqlServerName'), variables('sqlDBName'))]"
      ],
      "properties": {
        "value": "[concat('Server=tcp:', reference(resourceId('Microsoft.Sql/servers', variables('sqlServerName'))).fullyQualifiedDomainName, ',1433;Initial Catalog=', variables('sqlDBName'), ';Persist Security Info=False;User ID=', parameters('adminUsername'), ';Password=', parameters('adminPassword'), ';MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;')]"
      }
    },
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2021-02-01",
      "name": "[variables('storageAccountName')]",
      "location": "[parameters('location')]",
      "sku": {
        "name": "[if(equals(parameters('environmentType'), 'prod'), 'Standard_GRS', 'Standard_LRS')]"
      },
      "kind": "StorageV2",
      "properties": {
        "supportsHttpsTrafficOnly": true,
        "minimumTlsVersion": "TLS1_2"
      }
    },
    {
      "type": "Microsoft.KeyVault/vaults/secrets",
      "apiVersion": "2019-09-01",
      "name": "[concat(variables('keyVaultName'), '/StorageAccountConnection')]",
      "dependsOn": [
        "[resourceId('Microsoft.KeyVault/vaults', variables('keyVaultName'))]",
        "[resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName'))]"
      ],
      "properties": {
        "value": "[concat('DefaultEndpointsProtocol=https;AccountName=', variables('storageAccountName'), ';AccountKey=', listKeys(resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName')), '2021-02-01').keys[0].value, ';EndpointSuffix=core.windows.net')]"
      }
    },
    {
      "type": "Microsoft.OperationalInsights/workspaces",
      "apiVersion": "2020-08-01",
      "name": "[variables('logWorkspaceName')]",
      "location": "[parameters('location')]",
      "properties": {
        "sku": {
          "name": "PerGB2018"
        },
        "retentionInDays": 30
      }
    },
    {
      "type": "Microsoft.Insights/components",
      "apiVersion": "2020-02-02",
      "name": "[variables('appInsightsName')]",
      "location": "[parameters('location')]",
      "kind": "web",
      "properties": {
        "Application_Type": "web",
        "WorkspaceResourceId": "[resourceId('Microsoft.OperationalInsights/workspaces', variables('logWorkspaceName'))]"
      },
      "dependsOn": [
        "[resourceId('Microsoft.OperationalInsights/workspaces', variables('logWorkspaceName'))]"
      ]
    },
    {
      "type": "Microsoft.KeyVault/vaults/accessPolicies",
      "apiVersion": "2019-09-01",
      "name": "[concat(variables('keyVaultName'), '/add')]",
      "dependsOn": [
        "[resourceId('Microsoft.Web/sites', variables('webAppName'))]",
        "[resourceId('Microsoft.Web/sites', variables('apiAppName'))]",
        "[resourceId('Microsoft.KeyVault/vaults', variables('keyVaultName'))]"
      ],
      "properties": {
        "accessPolicies": [
          {
            "tenantId": "[subscription().tenantId]",
            "objectId": "[reference(resourceId('Microsoft.Web/sites', variables('webAppName')), '2020-06-01', 'Full').identity.principalId]",
            "permissions": {
              "secrets": [
                "get",
                "list"
              ]
            }
          },
          {
            "tenantId": "[subscription().tenantId]",
            "objectId": "[reference(resourceId('Microsoft.Web/sites', variables('apiAppName')), '2020-06-01', 'Full').identity.principalId]",
            "permissions": {
              "secrets": [
                "get",
                "list"
              ]
            }
          }
        ]
      }
    }
  ],
  "outputs": {
    "webAppUrl": {
      "type": "string",
      "value": "[concat('https://', reference(resourceId('Microsoft.Web/sites', variables('webAppName'))).defaultHostName)]"
    },
    "apiAppUrl": {
      "type": "string",
      "value": "[concat('https://', reference(resourceId('Microsoft.Web/sites', variables('apiAppName'))).defaultHostName)]"
    },
    "keyVaultUrl": {
      "type": "string",
      "value": "[reference(resourceId('Microsoft.KeyVault/vaults', variables('keyVaultName'))).vaultUri]"
    },
    "sqlServerFqdn": {
      "type": "string",
      "value": "[reference(resourceId('Microsoft.Sql/servers', variables('sqlServerName'))).fullyQualifiedDomainName]"
    },
    "storageAccountName": {
      "type": "string",
      "value": "[variables('storageAccountName')]"
    },
    "appInsightsInstrumentationKey": {
      "type": "string",
      "value": "[reference(resourceId('Microsoft.Insights/components', variables('appInsightsName'))).InstrumentationKey]"
    }
  }
}`,
          exercise: {
            instructions:
              'Design an Azure architecture for a three-tier web application with a web frontend, API layer, and database backend. Your solution should: (1) Include appropriate App Service plans for each tier, (2) Implement secure communication between tiers using VNet integration, (3) Store application secrets in Key Vault, (4) Set up monitoring with Application Insights, (5) Configure scaling based on load. Provide a diagram and ARM template structure.',
          },
        },
        {
          title: 'Containerization and Kubernetes (5 Key Concepts)',
          explanation: `
        <p>These five concepts cover essential containerization and Kubernetes principles for modern cloud-native applications:</p>

        <h4>6. Docker Containers and Images</h4>
        <p>Docker is a platform for developing, shipping, and running applications in containers:</p>

        <p><strong>Key Concepts:</strong></p>
        <ul>
          <li><strong>Containers</strong>: Lightweight, standalone, executable packages that include everything needed to run an application</li>
          <li><strong>Images</strong>: Read-only templates used to create containers, consisting of layered filesystems</li>
          <li><strong>Dockerfile</strong>: Text file defining instructions to build an image</li>
          <li><strong>Registry</strong>: Repository for storing and sharing Docker images (e.g., Docker Hub, Azure Container Registry)</li>
          <li><strong>Docker Engine</strong>: Runtime environment for containers</li>
        </ul>

        <p><strong>Container Benefits:</strong></p>
        <ul>
          <li><strong>Consistency</strong>: Same environment from development to production</li>
          <li><strong>Isolation</strong>: Applications and dependencies packaged together without interference</li>
          <li><strong>Portability</strong>: Runs on any platform that supports Docker</li>
          <li><strong>Efficiency</strong>: Lightweight compared to virtual machines</li>
          <li><strong>Scalability</strong>: Easily scalable horizontally</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Example Dockerfile for a Node.js application
FROM node:14-alpine

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80

# Expose the application port
EXPOSE 80

# Start the application
CMD ["node", "server.js"]

// Build and run commands
# Build the image
docker build -t myapp:1.0 .

# Run the container
docker run -d -p 8080:80 --name myapp-container myapp:1.0

# View running containers
docker ps

# Stop the container
docker stop myapp-container

# Push image to a registry
docker tag myapp:1.0 myregistry.azurecr.io/myapp:1.0
docker push myregistry.azurecr.io/myapp:1.0

// Docker Compose example for multi-container application
version: '3'
services:
  web:
    build: ./web
    ports:
      - "80:80"
    depends_on:
      - api
    environment:
      - API_URL=http://api:3000
  
  api:
    build: ./api
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_USER=postgres
      - DB_PASSWORD=example
  
  db:
    image: postgres:13
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=example
      - POSTGRES_USER=postgres
      - POSTGRES_DB=myapp

volumes:
  db-data:</code></pre>
        </div>

        <h4>7. Azure Kubernetes Service (AKS)</h4>
        <p>Azure Kubernetes Service is a managed Kubernetes offering that simplifies deploying, managing, and scaling containerized applications:</p>

        <p><strong>Key Features:</strong></p>
        <ul>
          <li><strong>Managed Control Plane</strong>: Azure manages the Kubernetes master nodes</li>
          <li><strong>Autoscaling</strong>: Horizontal pod autoscaling and cluster autoscaling</li>
          <li><strong>Azure Integration</strong>: Seamless integration with other Azure services</li>
          <li><strong>Advanced Networking</strong>: Support for Azure CNI, kubenet, and private clusters</li>
          <li><strong>Security</strong>: RBAC, Azure AD integration, and network policies</li>
        </ul>

        <p><strong>AKS Architecture:</strong></p>
        <ul>
          <li><strong>Control Plane</strong>: Managed by Azure, includes API server, scheduler, controller manager</li>
          <li><strong>Node Pools</strong>: Groups of VMs running containerized applications</li>
          <li><strong>Virtual Network</strong>: Network infrastructure for the cluster</li>
          <li><strong>Azure Container Registry</strong>: Storage for container images</li>
          <li><strong>Azure Monitor</strong>: Monitoring and logging for the cluster</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Creating an AKS cluster with Azure CLI
# Create a resource group
az group create --name myAKSGroup --location eastus

# Create an AKS cluster
az aks create \
  --resource-group myAKSGroup \
  --name myAKSCluster \
  --node-count 3 \
  --enable-addons monitoring \
  --generate-ssh-keys

# Connect to the AKS cluster
az aks get-credentials --resource-group myAKSGroup --name myAKSCluster

# Create an Azure Container Registry (ACR)
az acr create --resource-group myAKSGroup --name myACRRegistry --sku Basic

# Attach ACR to AKS
az aks update --name myAKSCluster --resource-group myAKSGroup \
  --attach-acr myACRRegistry

// Basic deployment to AKS (deployment.yaml)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myacr.azurecr.io/myapp:1.0
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 250m
            memory: 256Mi

// Service to expose the application (service.yaml)
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  type: LoadBalancer
  ports:
  - port: 80
  selector:
    app: myapp

// Deploy to AKS
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

// Check deployment status
kubectl get deployments
kubectl get services

// Scale the deployment
kubectl scale deployment myapp --replicas=5

// AKS cluster autoscaler
az aks update \
  --resource-group myAKSGroup \
  --name myAKSCluster \
  --enable-cluster-autoscaler \
  --min-count 1 \
  --max-count 5</code></pre>
        </div>

        <h4>8. Kubernetes Core Concepts</h4>
        <p>Understanding key Kubernetes concepts is essential for effective orchestration of containerized applications:</p>

        <p><strong>Basic Components:</strong></p>
        <ul>
          <li><strong>Nodes</strong>: Worker machines that run containerized applications</li>
          <li><strong>Pods</strong>: Smallest deployable units that can contain one or more containers</li>
          <li><strong>Services</strong>: Abstract way to expose applications running on pods</li>
          <li><strong>Deployments</strong>: Declarative updates for pods and replica sets</li>
          <li><strong>ReplicaSets</strong>: Ensure a specified number of pod replicas are running</li>
        </ul>

        <p><strong>Advanced Resources:</strong></p>
        <ul>
          <li><strong>ConfigMaps & Secrets</strong>: Decouple configuration from container images</li>
          <li><strong>Persistent Volumes</strong>: Storage resources in the cluster</li>
          <li><strong>StatefulSets</strong>: Manage stateful applications</li>
          <li><strong>DaemonSets</strong>: Ensure specific pods run on all nodes</li>
          <li><strong>Ingress</strong>: Manage external access to services</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Pod definition
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.19
    ports:
    - containerPort: 80

// Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.19
        ports:
        - containerPort: 80

// Service
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: nginx

// ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  app-settings.json: |
    {
      "environment": "production",
      "logLevel": "info",
      "apiUrl": "https://api.example.com"
    }

// Secret
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  db-password: UGFzc3dvcmQxMjM=  # base64 encoded "Password123"
  api-key: QWJjZGVmMTIzNDU2Nzg5  # base64 encoded "Abcdef123456789"

// Pod using ConfigMap and Secret
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
  - name: app
    image: myapp:1.0
    volumeMounts:
    - name: config-volume
      mountPath: /app/config
    - name: secret-volume
      mountPath: /app/secrets
      readOnly: true
    env:
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: app-secrets
          key: db-password
  volumes:
  - name: config-volume
    configMap:
      name: app-config
  - name: secret-volume
    secret:
      secretName: app-secrets

// Persistent Volume
apiVersion: v1
kind: PersistentVolume
metadata:
  name: app-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  storageClassName: standard
  azureDisk:
    kind: Managed
    diskName: myAKSDisk
    diskURI: /subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Compute/disks/myAKSDisk

// Persistent Volume Claim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard

// StatefulSet for stateful applications
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: "postgres"
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:13
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "standard"
      resources:
        requests:
          storage: 10Gi</code></pre>
        </div>

        <h4>9. Kubernetes Networking and Ingress</h4>
        <p>Kubernetes networking enables communication between pods and external clients:</p>

        <p><strong>Networking Concepts:</strong></p>
        <ul>
          <li><strong>Pod Network</strong>: Network that enables pod-to-pod communication</li>
          <li><strong>Service Types</strong>: ClusterIP, NodePort, LoadBalancer, ExternalName</li>
          <li><strong>Network Policies</strong>: Rules that control traffic flow between pods</li>
          <li><strong>DNS</strong>: Service discovery within the cluster</li>
          <li><strong>Ingress</strong>: API object that manages external access to services</li>
        </ul>

        <p><strong>Ingress Controllers:</strong></p>
        <ul>
          <li><strong>Nginx Ingress Controller</strong>: Popular open-source ingress controller</li>
          <li><strong>Application Gateway Ingress Controller</strong>: Azure-specific ingress controller</li>
          <li><strong>Traefik</strong>: Modern HTTP reverse proxy and load balancer</li>
          <li><strong>Kong</strong>: API gateway built on nginx</li>
          <li><strong>Istio</strong>: Service mesh with ingress capabilities</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Different Service types
// ClusterIP (default) - internal cluster IP
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: backend

// NodePort - exposes the Service on each Node's IP at a static port
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080  # Optional, 30000-32767
  selector:
    app: backend

// LoadBalancer - exposes the Service externally using a cloud provider's load balancer
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: frontend

// Network Policy example - restricting traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-allow
spec:
  podSelector:
    matchLabels:
      app: api
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: web
    ports:
    - protocol: TCP
      port: 8080

// Basic Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 80

// TLS with Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress-tls
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls-cert
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80

// Application Gateway Ingress Controller (AGIC) for Azure
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: aks-ingress
  annotations:
    kubernetes.io/ingress.class: azure/application-gateway
    appgw.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: aks-ingress-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 80</code></pre>
        </div>

        <h4>10. Microservices and Container Orchestration Patterns</h4>
        <p>Microservices architecture and container orchestration patterns provide best practices for designing and deploying cloud-native applications:</p>

        <p><strong>Microservices Principles:</strong></p>
        <ul>
          <li><strong>Single Responsibility</strong>: Each service focuses on a specific business capability</li>
          <li><strong>Independence</strong>: Services can be developed, deployed, and scaled independently</li>
          <li><strong>Decentralization</strong>: No central governance, distributed data management</li>
          <li><strong>Resilience</strong>: Failure of one service doesn't affect the entire system</li>
          <li><strong>Observability</strong>: Comprehensive monitoring and logging</li>
        </ul>

        <p><strong>Container Orchestration Patterns:</strong></p>
        <ul>
          <li><strong>Sidecar</strong>: Helper container extending the main container</li>
          <li><strong>Ambassador</strong>: Proxy for accessing external services</li>
          <li><strong>Adapter</strong>: Standardize output from the main container</li>
          <li><strong>Init Container</strong>: Runs before app containers to perform setup tasks</li>
          <li><strong>Service Mesh</strong>: Network infrastructure layer for service-to-service communication</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Sidecar Pattern - main application with a logging sidecar
apiVersion: v1
kind: Pod
metadata:
  name: app-with-sidecar
spec:
  containers:
  - name: app
    image: myapp:1.0
    ports:
    - containerPort: 8080
    volumeMounts:
    - name: logs
      mountPath: /var/log/app
  - name: log-sidecar
    image: log-collector:1.0
    volumeMounts:
    - name: logs
      mountPath: /var/log/app
  volumes:
  - name: logs
    emptyDir: {}

// Ambassador Pattern - Redis with proxy sidecar
apiVersion: v1
kind: Pod
metadata:
  name: redis-with-ambassador
spec:
  containers:
  - name: redis
    image: redis:6
    ports:
    - containerPort: 6379
  - name: redis-ambassador
    image: redis-sentinel:1.0
    ports:
    - containerPort: 6380
    env:
    - name: REDIS_HOST
      value: localhost
    - name: REDIS_PORT
      value: "6379"

// Adapter Pattern - Legacy application with normalized metrics
apiVersion: v1
kind: Pod
metadata:
  name: app-with-adapter
spec:
  containers:
  - name: app
    image: legacy-app:1.0
    ports:
    - containerPort: 8080
  - name: metrics-adapter
    image: prometheus-adapter:1.0
    ports:
    - containerPort: 9090
    env:
    - name: APP_ENDPOINT
      value: "http://localhost:8080/metrics"

// Init Container Pattern - database setup before main application
apiVersion: v1
kind: Pod
metadata:
  name: app-with-init
spec:
  initContainers:
  - name: init-db
    image: db-init:1.0
    command: ['sh', '-c', 'until pg_isready -h db-service; do echo waiting for database; sleep 2; done;']
  - name: run-migrations
    image: flyway:7
    env:
    - name: DB_URL
      value: "jdbc:postgresql://db-service:5432/mydb"
  containers:
  - name: app
    image: myapp:1.0
    ports:
    - containerPort: 8080
    env:
    - name: DB_URL
      value: "jdbc:postgresql://db-service:5432/mydb"

// Service Mesh (Istio) - Adding Istio sidecar injection
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  labels:
    app: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
      annotations:
        sidecar.istio.io/inject: "true"  # Enable Istio sidecar injection
    spec:
      containers:
      - name: frontend
        image: frontend:1.0
        ports:
        - containerPort: 80

// Istio Virtual Service for routing
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: frontend-vs
spec:
  hosts:
  - "frontend.example.com"
  gateways:
  - frontend-gateway
  http:
  - match:
    - uri:
        prefix: /v1
    route:
    - destination:
        host: frontend-v1
        port:
          number: 80
      weight: 90
    - destination:
        host: frontend-v2
        port:
          number: 80
      weight: 10</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> When interviewing for containerization and Kubernetes positions, focus on demonstrating your understanding of the entire container lifecycle and how Kubernetes orchestrates containers at scale.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"Explain the difference between a container and a virtual machine"</li>
            <li>"How would you design a multi-container application for Kubernetes?"</li>
            <li>"What strategies would you use for handling application configuration in containers?"</li>
            <li>"Explain how Kubernetes networking enables communication between pods"</li>
            <li>"What are the benefits of a microservices architecture and how does Kubernetes support it?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Full Kubernetes deployment for a microservices application on AKS
// namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: microservices
  labels:
    name: microservices

// configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: microservices
data:
  ENVIRONMENT: "production"
  LOG_LEVEL: "info"
  API_VERSION: "v1"
  FRONTEND_URL: "https://example.com"
  API_URL: "https://api.example.com"
  CACHE_TTL: "3600"

// secrets.yaml (sensitive values should be securely managed)
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: microservices
type: Opaque
data:
  # Base64 encoded values
  DB_USER: cG9zdGdyZXM=         # postgres
  DB_PASSWORD: cGFzc3dvcmQxMjM=  # password123
  REDIS_PASSWORD: cmVkaXNwYXNz   # redispass
  API_KEY: YXBpa2V5MTIzNDU2     # apikey123456

// database-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: microservices
  labels:
    app: postgres
spec:
  ports:
  - port: 5432
    targetPort: 5432
    name: postgres
  selector:
    app: postgres
  clusterIP: None  # Headless service for StatefulSet

// database-statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: microservices
spec:
  serviceName: "postgres"
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:13
        ports:
        - containerPort: 5432
          name: postgres
        env:
        - name: POSTGRES_USER
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DB_USER
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DB_PASSWORD
        - name: POSTGRES_DB
          value: "appdb"
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "1Gi"
            cpu: "500m"
  volumeClaimTemplates:
  - metadata:
      name: postgres-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "managed-premium"
      resources:
        requests:
          storage: 10Gi

// redis-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: microservices
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:6
        args: ["--requirepass", "$(REDIS_PASSWORD)"]
        ports:
        - containerPort: 6379
        env:
        - name: REDIS_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: REDIS_PASSWORD
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"

// redis-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: redis
  namespace: microservices
spec:
  ports:
  - port: 6379
    targetPort: 6379
  selector:
    app: redis

// backend-api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-api
  namespace: microservices
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend-api
  template:
    metadata:
      labels:
        app: backend-api
    spec:
      containers:
      - name: api
        image: myacr.azurecr.io/backend-api:1.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: ENVIRONMENT
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: LOG_LEVEL
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: API_KEY
        - name: DB_HOST
          value: "postgres"
        - name: DB_PORT
          value: "5432"
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DB_USER
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DB_PASSWORD
        - name: DB_NAME
          value: "appdb"
        - name: REDIS_HOST
          value: "redis"
        - name: REDIS_PORT
          value: "6379"
        - name: REDIS_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: REDIS_PASSWORD
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"

// backend-api-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-api
  namespace: microservices
spec:
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: backend-api

// frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: microservices
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: myacr.azurecr.io/frontend:1.0
        ports:
        - containerPort: 80
        env:
        - name: API_URL
          value: "http://backend-api"
        - name: ENVIRONMENT
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: ENVIRONMENT
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"

// frontend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: microservices
spec:
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: frontend

// ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: microservices
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  tls:
  - hosts:
    - example.com
    - api.example.com
    secretName: tls-secret
  rules:
  - host: example.com
    http:
      paths:
      - path: /(.*)
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 80
  - host: api.example.com
    http:
      paths:
      - path: /(.*)
        pathType: Prefix
        backend:
          service:
            name: backend-api
            port:
              number: 80

// horizontal-pod-autoscaler.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-api-hpa
  namespace: microservices
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70

// network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-api-policy
  namespace: microservices
spec:
  podSelector:
    matchLabels:
      app: backend-api
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - podSelector:
        matchLabels:
          app: redis
    ports:
    - protocol: TCP
      port: 6379

// priority-class.yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
description: "High priority pods for critical microservices"

// resource-quota.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: microservices-quota
  namespace: microservices
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "20"

// Command to apply all configurations
# kubectl apply -f namespace.yaml
# kubectl apply -f configmap.yaml
# kubectl apply -f secrets.yaml
# kubectl apply -f database-service.yaml
# kubectl apply -f database-statefulset.yaml
# kubectl apply -f redis-deployment.yaml
# kubectl apply -f redis-service.yaml
# kubectl apply -f backend-api-deployment.yaml
# kubectl apply -f backend-api-service.yaml
# kubectl apply -f frontend-deployment.yaml
# kubectl apply -f frontend-service.yaml
# kubectl apply -f ingress.yaml
# kubectl apply -f horizontal-pod-autoscaler.yaml
# kubectl apply -f network-policy.yaml
# kubectl apply -f priority-class.yaml
# kubectl apply -f resource-quota.yaml

// To check deployment status
# kubectl get all -n microservices
# kubectl get ingress -n microservices
# kubectl get hpa -n microservices`,
          exercise: {
            instructions:
              'Design a microservices architecture for a containerized e-commerce application to be deployed on AKS. Your solution should include: (1) A frontend service, product catalog service, order service, and user service, (2) A database for each service following the database-per-service pattern, (3) Appropriate Kubernetes resources for each service including deployments, services, and config, (4) Network policies to control communication between services, (5) Horizontal Pod Autoscaling based on CPU and memory usage.',
          },
        },
        {
          title: 'Infrastructure as Code and Configuration (5 Key Concepts)',
          explanation: `
        <p>These five concepts cover critical infrastructure as code and configuration management approaches:</p>

        <h4>11. Terraform and Azure Provider</h4>
        <p>Terraform is a popular infrastructure as code (IaC) tool that allows provisioning and managing cloud resources through declarative configuration files:</p>

        <p><strong>Key Concepts:</strong></p>
        <ul>
          <li><strong>HCL (HashiCorp Configuration Language)</strong>: Declarative language used by Terraform</li>
          <li><strong>Providers</strong>: Plugins that interact with specific cloud platforms (e.g., Azure)</li>
          <li><strong>Resources</strong>: Infrastructure components defined in Terraform configuration</li>
          <li><strong>State</strong>: Terraform's representation of real-world resources</li>
          <li><strong>Modules</strong>: Reusable configuration components</li>
        </ul>

        <p><strong>Terraform Workflow:</strong></p>
        <ul>
          <li><strong>terraform init</strong>: Initialize a Terraform working directory</li>
          <li><strong>terraform plan</strong>: Create an execution plan</li>
          <li><strong>terraform apply</strong>: Apply the changes to reach the desired state</li>
          <li><strong>terraform destroy</strong>: Destroy Terraform-managed infrastructure</li>
          <li><strong>terraform validate</strong>: Validate the configuration files</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic Terraform configuration for Azure
# provider.tf - Define the Azure provider
provider "azurerm" {
  features {}
}

# variables.tf - Define input variables
variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "example-resources"
}

variable "location" {
  description = "Azure region to deploy resources"
  type        = string
  default     = "East US"
}

# main.tf - Define Azure resources
resource "azurerm_resource_group" "example" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_virtual_network" "example" {
  name                = "example-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}

resource "azurerm_subnet" "example" {
  name                 = "example-subnet"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_network_interface" "example" {
  name                = "example-nic"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.example.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_linux_virtual_machine" "example" {
  name                = "example-vm"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  size                = "Standard_B1s"
  admin_username      = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.example.id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
}

# outputs.tf - Define output values
output "vm_id" {
  description = "ID of the created VM"
  value       = azurerm_linux_virtual_machine.example.id
}

// Example of a Terraform module for a standard web app
# modules/webapp/variables.tf
variable "name" {
  description = "Name of the web app"
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure location"
  type        = string
}

variable "app_service_plan_id" {
  description = "ID of the App Service Plan"
  type        = string
}

# modules/webapp/main.tf
resource "azurerm_app_service" "webapp" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name
  app_service_plan_id = var.app_service_plan_id

  site_config {
    dotnet_framework_version = "v4.0"
    scm_type                 = "LocalGit"
  }

  app_settings = {
    "SOME_KEY" = "some-value"
  }

  connection_string {
    name  = "Database"
    type  = "SQLAzure"
    value = "Server=some-server.database.windows.net;Initial Catalog=some-db;User ID=some-user;Password=some-password;"
  }
}

# modules/webapp/outputs.tf
output "default_site_hostname" {
  description = "The default hostname of the web app"
  value       = azurerm_app_service.webapp.default_site_hostname
}

# main.tf - Using the webapp module
module "web_app" {
  source              = "./modules/webapp"
  name                = "example-app"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  app_service_plan_id = azurerm_app_service_plan.example.id
}</code></pre>
        </div>

        <h4>12. Helm for Kubernetes</h4>
        <p>Helm is a package manager for Kubernetes that allows you to define, install, and upgrade complex Kubernetes applications:</p>

        <p><strong>Key Concepts:</strong></p>
        <ul>
          <li><strong>Charts</strong>: Packages of pre-configured Kubernetes resources</li>
          <li><strong>Releases</strong>: Instances of charts deployed in a Kubernetes cluster</li>
          <li><strong>Repositories</strong>: Storage for charts</li>
          <li><strong>Values</strong>: Configuration for charts</li>
          <li><strong>Templates</strong>: Parameterized Kubernetes manifests</li>
        </ul>

        <p><strong>Helm Commands:</strong></p>
        <ul>
          <li><strong>helm install</strong>: Install a chart</li>
          <li><strong>helm upgrade</strong>: Upgrade a release</li>
          <li><strong>helm rollback</strong>: Roll back a release to a previous revision</li>
          <li><strong>helm uninstall</strong>: Uninstall a release</li>
          <li><strong>helm create</strong>: Create a new chart</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Example Helm chart structure
myapp/
  Chart.yaml          # Chart metadata
  values.yaml         # Default configuration values
  charts/             # Directory for chart dependencies
  templates/          # Templates for Kubernetes resources
    deployment.yaml
    service.yaml
    ingress.yaml
    _helpers.tpl      # Template helpers

// Chart.yaml example
apiVersion: v2
name: myapp
description: A Helm chart for my application
type: application
version: 0.1.0
appVersion: 1.0.0
dependencies:
  - name: postgresql
    version: 11.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled

// values.yaml example
replicaCount: 2

image:
  repository: myregistry.azurecr.io/myapp
  tag: 1.0.0
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
  hosts:
    - host: myapp.example.com
      paths: ["/"]

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 50m
    memory: 64Mi

postgresql:
  enabled: true
  postgresqlUsername: myapp
  postgresqlPassword: password
  postgresqlDatabase: myapp

// Template example (deployment.yaml)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myapp.fullname" . }}
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "myapp.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "myapp.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          env:
            - name: DB_HOST
              value: {{ include "myapp.fullname" . }}-postgresql
            - name: DB_USER
              value: {{ .Values.postgresql.postgresqlUsername }}
            - name: DB_PASSWORD
              value: {{ .Values.postgresql.postgresqlPassword }}

// Helper template (_helpers.tpl)
{{/* Generate name */}}
{{- define "myapp.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/* Create a fully qualified name */}}
{{- define "myapp.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/* Common labels */}}
{{- define "myapp.labels" -}}
helm.sh/chart: {{ include "myapp.chart" . }}
{{ include "myapp.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/* Selector labels */}}
{{- define "myapp.selectorLabels" -}}
app.kubernetes.io/name: {{ include "myapp.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

// Helm commands
# Install a chart
helm install myapp ./myapp

# Install with custom values
helm install myapp ./myapp --values custom-values.yaml

# Set individual values
helm install myapp ./myapp --set replicaCount=3 --set service.type=LoadBalancer

# Upgrade a release
helm upgrade myapp ./myapp

# Rollback to a previous version
helm rollback myapp 1

# List releases
helm list

# Uninstall a release
helm uninstall myapp</code></pre>
        </div>

        <h4>13. Azure Bicep</h4>
        <p>Azure Bicep is a domain-specific language (DSL) for deploying Azure resources, serving as a more user-friendly alternative to ARM templates:</p>

        <p><strong>Key Features:</strong></p>
        <ul>
          <li><strong>Simplified Syntax</strong>: More concise and readable than ARM JSON</li>
          <li><strong>Type Safety</strong>: Strong typing helps catch errors early</li>
          <li><strong>Modularity</strong>: Better support for breaking down complex deployments</li>
          <li><strong>Intellisense Support</strong>: Improved developer experience in VS Code</li>
          <li><strong>Resource Declarations</strong>: Declarative approach to defining resources</li>
        </ul>

        <p><strong>Bicep Concepts:</strong></p>
        <ul>
          <li><strong>Resources</strong>: Azure resources to be deployed</li>
          <li><strong>Parameters</strong>: Input values for deployment</li>
          <li><strong>Variables</strong>: Named values for use within the template</li>
          <li><strong>Outputs</strong>: Values returned after deployment</li>
          <li><strong>Modules</strong>: Reusable components for complex deployments</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Example Bicep template (main.bicep)
// Parameters
param location string = resourceGroup().location
param appName string
param environmentName string = 'dev'
param sqlAdminLogin string
@secure()
param sqlAdminPassword string

// Variables
var appServicePlanName = '\${appName}-plan-\${environmentName}'
var webAppName = '\${appName}-web-\${environmentName}'
var sqlServerName = '\${appName}-sql-\${uniqueString(resourceGroup().id)}'
var sqlDatabaseName = '\${appName}-db-\${environmentName}'
var storageAccountName = '\${toLower(appName)}\${uniqueString(resourceGroup().id)}'

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2020-12-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: environmentName == 'prod' ? 'P1v2' : 'B1'
    tier: environmentName == 'prod' ? 'PremiumV2' : 'Basic'
  }
}

// Web App
resource webApp 'Microsoft.Web/sites@2020-12-01' = {
  name: webAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      appSettings: [
        {
          name: 'ENVIRONMENT'
          value: environmentName
        }
        {
          name: 'WEBSITE_NODE_DEFAULT_VERSION'
          value: '~14'
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          name: 'ConnectionStrings__DefaultConnection'
          value: 'Server=\${sqlServer.properties.fullyQualifiedDomainName};Database=\${sqlDatabaseName};User Id=\${sqlAdminLogin};Password=\${sqlAdminPassword};'
        }
      ]
    }
  }
}

// SQL Server
resource sqlServer 'Microsoft.Sql/servers@2020-11-01-preview' = {
  name: sqlServerName
  location: location
  properties: {
    administratorLogin: sqlAdminLogin
    administratorLoginPassword: sqlAdminPassword
    version: '12.0'
  }
}

// SQL Database
resource sqlDatabase 'Microsoft.Sql/servers/databases@2020-11-01-preview' = {
  parent: sqlServer
  name: sqlDatabaseName
  location: location
  sku: {
    name: environmentName == 'prod' ? 'S1' : 'Basic'
    tier: environmentName == 'prod' ? 'Standard' : 'Basic'
  }
}

// SQL Firewall rule to allow Azure services
resource sqlFirewallRule 'Microsoft.Sql/servers/firewallRules@2020-11-01-preview' = {
  parent: sqlServer
  name: 'AllowAllAzureIPs'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

// Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: environmentName == 'prod' ? 'Standard_GRS' : 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
  }
}

// Application Insights
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '\${appName}-insights-\${environmentName}'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
  }
}

// Outputs
output webAppUrl string = webApp.properties.defaultHostName
output sqlServerFqdn string = sqlServer.properties.fullyQualifiedDomainName

// Bicep module example (database.bicep)
param location string
param serverName string
param databaseName string
param administratorLogin string
@secure()
param administratorLoginPassword string
param skuName string = 'Basic'
param skuTier string = 'Basic'

resource sqlServer 'Microsoft.Sql/servers@2020-11-01-preview' = {
  name: serverName
  location: location
  properties: {
    administratorLogin: administratorLogin
    administratorLoginPassword: administratorLoginPassword
    version: '12.0'
  }
}

resource sqlDatabase 'Microsoft.Sql/servers/databases@2020-11-01-preview' = {
  parent: sqlServer
  name: databaseName
  location: location
  sku: {
    name: skuName
    tier: skuTier
  }
}

resource sqlFirewallRule 'Microsoft.Sql/servers/firewallRules@2020-11-01-preview' = {
  parent: sqlServer
  name: 'AllowAllAzureIPs'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

output sqlServerFqdn string = sqlServer.properties.fullyQualifiedDomainName

// Using the module (in main.bicep)
module database './database.bicep' = {
  name: 'databaseDeploy'
  params: {
    location: location
    serverName: sqlServerName
    databaseName: sqlDatabaseName
    administratorLogin: sqlAdminLogin
    administratorLoginPassword: sqlAdminPassword
    skuName: environmentName == 'prod' ? 'S1' : 'Basic'
    skuTier: environmentName == 'prod' ? 'Standard' : 'Basic'
  }
}</code></pre>
        </div>

        <h4>14. GitOps with Flux and Azure Arc</h4>
        <p>GitOps is an operational framework that takes DevOps best practices and applies them to infrastructure automation and application deployment:</p>

        <p><strong>Key Principles:</strong></p>
        <ul>
          <li><strong>Declarative Infrastructure</strong>: Infrastructure defined as code</li>
          <li><strong>Git as Single Source of Truth</strong>: Git repository as the canonical source for infrastructure and application definitions</li>
          <li><strong>Pull-Based Deployment</strong>: Deployment agents pull changes from Git</li>
          <li><strong>Continuous Reconciliation</strong>: Automatic correction of drift between desired and actual state</li>
          <li><strong>Observable and Auditable</strong>: Changes tracked through Git history</li>
        </ul>

        //Continuing from the previous file - completing the Infrastructure as Code section 
//and adding the CI/CD and DevOps Practices section

        <p><strong>Flux and Azure Arc:</strong></p>
        <ul>
          <li><strong>Flux</strong>: A GitOps operator for Kubernetes</li>
          <li><strong>Azure Arc</strong>: Extends Azure management to any infrastructure</li>
          <li><strong>Arc-enabled Kubernetes</strong>: Register any Kubernetes cluster with Azure</li>
          <li><strong>Azure GitOps</strong>: GitOps with Flux on Arc-enabled Kubernetes</li>
          <li><strong>Configuration Management</strong>: Manage configurations across hybrid environments</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic Flux configuration
# flux-system directory structure
flux-system/
  gotk-components.yaml
  gotk-sync.yaml
  kustomization.yaml

# gotk-sync.yaml (GitRepository and Kustomization resources)
apiVersion: source.toolkit.fluxcd.io/v1beta1
kind: GitRepository
metadata:
  name: flux-system
  namespace: flux-system
spec:
  interval: 1m0s
  ref:
    branch: main
  secretRef:
    name: flux-system
  url: ssh://git@github.com/organization/repository
---
apiVersion: kustomize.toolkit.fluxcd.io/v1beta1
kind: Kustomization
metadata:
  name: flux-system
  namespace: flux-system
spec:
  interval: 10m0s
  path: ./clusters/production
  prune: true
  sourceRef:
    kind: GitRepository
    name: flux-system
  validation: client

// Registering an AKS cluster with Azure Arc
# Create a resource group for Arc resources
az group create --name arc-resources --location eastus

# Register the AKS cluster with Azure Arc
az connectedk8s connect --name my-arc-cluster \
  --resource-group arc-resources --location eastus

// Enable GitOps with Flux on Arc-enabled cluster
az k8s-configuration flux create \
  --name cluster-config \
  --cluster-name my-arc-cluster \
  --resource-group arc-resources \
  --namespace flux-system \
  --scope cluster \
  --url https://github.com/organization/gitops-config \
  --branch main \
  --kustomization name=apps path=./apps prune=true

// Example folder structure for GitOps repository
gitops-repo/
├── base/
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   └── database/
│       ├── statefulset.yaml
│       ├── service.yaml
│       └── kustomization.yaml
├── overlays/
│   ├── dev/
│   │   ├── frontend/
│   │   │   ├── config-patch.yaml
│   │   │   └── kustomization.yaml
│   │   ├── backend/
│   │   │   ├── config-patch.yaml
│   │   │   └── kustomization.yaml
│   │   └── kustomization.yaml
│   └── prod/
│       ├── frontend/
│       │   ├── config-patch.yaml
│       │   └── kustomization.yaml
│       ├── backend/
│       │   ├── config-patch.yaml
│       │   └── kustomization.yaml
│       └── kustomization.yaml
└── clusters/
    ├── dev/
    │   └── kustomization.yaml
    └── prod/
        └── kustomization.yaml</code></pre>
        </div>

        <h4>15. Configuration Management with Azure Policy</h4>
        <p>Azure Policy helps to enforce organizational standards and assess compliance at scale across Azure resources:</p>

        <p><strong>Key Concepts:</strong></p>
        <ul>
          <li><strong>Policies</strong>: Rules that govern resource properties and ensure compliance</li>
          <li><strong>Initiatives</strong>: Collections of policies that are designed to achieve a single goal</li>
          <li><strong>Assignments</strong>: Application of a policy or initiative to a specific scope</li>
          <li><strong>Compliance</strong>: Evaluation of resource conformity with assigned policies</li>
          <li><strong>Remediation</strong>: Correction of non-compliant resources</li>
        </ul>

        <p><strong>Policy Effects:</strong></p>
        <ul>
          <li><strong>Audit</strong>: Log compliance state but don't enforce</li>
          <li><strong>Deny</strong>: Block resource creation or modification that violates policy</li>
          <li><strong>Append</strong>: Add specified properties to a resource during creation or update</li>
          <li><strong>Modify</strong>: Add, update, or remove properties or tags on a resource</li>
          <li><strong>DeployIfNotExists</strong>: Deploy related resources if they don't exist</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Example Azure Policy definition (JSON)
{
  "properties": {
    "displayName": "Require SQL Server 12.0 version",
    "description": "This policy ensures all SQL Servers use version 12.0.",
    "mode": "Indexed",
    "parameters": {},
    "policyRule": {
      "if": {
        "allOf": [
          {
            "field": "type",
            "equals": "Microsoft.Sql/servers"
          },
          {
            "field": "Microsoft.Sql/servers/version",
            "notEquals": "12.0"
          }
        ]
      },
      "then": {
        "effect": "deny"
      }
    }
  }
}

// Creating an Azure Policy with CLI
# Create a policy definition
az policy definition create --name 'require-sql-version' \
  --display-name 'Require SQL Server 12.0 version' \
  --description 'This policy ensures all SQL Servers use version 12.0.' \
  --rules 'path/to/policyrule.json' \
  --mode Indexed

# Assign the policy to a resource group
az policy assignment create --name 'sql-version-assignment' \
  --policy 'require-sql-version' \
  --resource-group 'myResourceGroup'

// Azure policy initiative (JSON)
{
  "properties": {
    "displayName": "Security baseline for SQL Server",
    "description": "Initiative enforcing security baseline controls for SQL Servers",
    "metadata": {
      "category": "SQL"
    },
    "parameters": {},
    "policyDefinitions": [
      {
        "policyDefinitionId": "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/require-sql-version",
        "policyDefinitionReferenceId": "SQLVersion",
        "parameters": {}
      },
      {
        "policyDefinitionId": "/providers/Microsoft.Authorization/policyDefinitions/9d099d94-af77-4c64-99c7-18499db599c0",
        "policyDefinitionReferenceId": "SQLThreatDetection",
        "parameters": {}
      },
      {
        "policyDefinitionId": "/providers/Microsoft.Authorization/policyDefinitions/abfb4388-5bf4-4ad7-ba82-2cd2f41ceae9",
        "policyDefinitionReferenceId": "SQLEncryption",
        "parameters": {}
      }
    ]
  }
}

// Policy for Azure Kubernetes Service (DeployIfNotExists example)
{
  "properties": {
    "displayName": "Deploy Azure Monitor for AKS",
    "description": "Deploy Azure Monitor for AKS if not installed",
    "mode": "Indexed",
    "parameters": {},
    "policyRule": {
      "if": {
        "field": "type",
        "equals": "Microsoft.ContainerService/managedClusters"
      },
      "then": {
        "effect": "DeployIfNotExists",
        "details": {
          "type": "Microsoft.ContainerService/managedClusters/providers/diagnosticSettings",
          "name": "default",
          "existenceCondition": {
            "allOf": [
              {
                "field": "Microsoft.ContainerService/managedClusters/providers/diagnosticSettings/default.logs[*].enabled",
                "equals": "true"
              }
            ]
          },
          "roleDefinitionIds": [
            "/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c"
          ],
          "deployment": {
            "properties": {
              "mode": "incremental",
              "template": {
                "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
                "contentVersion": "1.0.0.0",
                "parameters": {
                  "resourceName": {
                    "type": "string"
                  },
                  "logAnalyticsWorkspace": {
                    "type": "string"
                  }
                },
                "resources": [
                  {
                    "type": "Microsoft.ContainerService/managedClusters/providers/diagnosticSettings",
                    "apiVersion": "2017-05-01-preview",
                    "name": "[concat(parameters('resourceName'), '/Microsoft.Insights/default')]",
                    "properties": {
                      "workspaceId": "[parameters('logAnalyticsWorkspace')]",
                      "logs": [
                        {
                          "category": "kube-audit",
                          "enabled": true
                        },
                        {
                          "category": "kube-audit-admin",
                          "enabled": true
                        }
                      ],
                      "metrics": [
                        {
                          "category": "AllMetrics",
                          "enabled": true
                        }
                      ]
                    }
                  }
                ]
              },
              "parameters": {
                "resourceName": {
                  "value": "[field('name')]"
                },
                "logAnalyticsWorkspace": {
                  "value": "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}"
                }
              }
            }
          }
        }
      }
    }
  }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> When interviewing for Infrastructure as Code positions, focus on demonstrating practical experience with multiple IaC tools and how you've used them to automate complex infrastructure deployments.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"Compare and contrast Terraform, ARM templates, and Bicep. When would you choose one over the others?"</li>
            <li>"How do you handle secrets and sensitive information in IaC deployments?"</li>
            <li>"Explain your experience with CI/CD for infrastructure code"</li>
            <li>"How would you implement GitOps for Kubernetes deployments?"</li>
            <li>"Describe strategies for ensuring consistent configurations across multiple environments"</li>
          </ul>
        </div>
      `,
          codeExample: `// Terraform Infrastructure as Code for a comprehensive AKS deployment
// main.tf
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~>2.0"
    }
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = "~>1.14"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~>2.5"
    }
  }
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfstate12345"
    container_name       = "tfstate"
    key                  = "aks-prod.terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

provider "azuread" {}

provider "kubectl" {
  host                   = module.aks_cluster.kube_config.0.host
  client_certificate     = base64decode(module.aks_cluster.kube_config.0.client_certificate)
  client_key             = base64decode(module.aks_cluster.kube_config.0.client_key)
  cluster_ca_certificate = base64decode(module.aks_cluster.kube_config.0.cluster_ca_certificate)
  load_config_file       = false
}

provider "helm" {
  kubernetes {
    host                   = module.aks_cluster.kube_config.0.host
    client_certificate     = base64decode(module.aks_cluster.kube_config.0.client_certificate)
    client_key             = base64decode(module.aks_cluster.kube_config.0.client_key)
    cluster_ca_certificate = base64decode(module.aks_cluster.kube_config.0.cluster_ca_certificate)
  }
}

// variables.tf
variable "location" {
  description = "Azure region to deploy resources"
  type        = string
  default     = "eastus"
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "aks-production-rg"
}

variable "cluster_name" {
  description = "Name of the AKS cluster"
  type        = string
  default     = "production-aks"
}

variable "dns_prefix" {
  description = "DNS prefix for the AKS cluster"
  type        = string
  default     = "prod-aks"
}

variable "kubernetes_version" {
  description = "Version of Kubernetes to use"
  type        = string
  default     = "1.27.3"
}

variable "node_count" {
  description = "Number of nodes in the default node pool"
  type        = number
  default     = 3
}

variable "vm_size" {
  description = "Size of the VM for the nodes"
  type        = string
  default     = "Standard_D2s_v3"
}

variable "vnet_address_space" {
  description = "Address space for the virtual network"
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "subnet_address_prefixes" {
  description = "Address prefixes for the subnet"
  type        = list(string)
  default     = ["10.0.1.0/24"]
}

variable "acr_name" {
  description = "Name of the Azure Container Registry"
  type        = string
  default     = "prodacr12345"
}

variable "log_analytics_workspace_name" {
  description = "Name of the Log Analytics workspace"
  type        = string
  default     = "prod-aks-logs"
}

variable "key_vault_name" {
  description = "Name of the Azure Key Vault"
  type        = string
  default     = "prod-aks-kv12345"
}

// Create resource group
resource "azurerm_resource_group" "this" {
  name     = var.resource_group_name
  location = var.location
  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

// Create virtual network for AKS
resource "azurerm_virtual_network" "this" {
  name                = "\${var.cluster_name}-vnet"
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
  address_space       = var.vnet_address_space
  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

// Create subnet for AKS
resource "azurerm_subnet" "this" {
  name                 = "\${var.cluster_name}-subnet"
  resource_group_name  = azurerm_resource_group.this.name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = var.subnet_address_prefixes
}

// Create Log Analytics workspace for AKS monitoring
resource "azurerm_log_analytics_workspace" "this" {
  name                = var.log_analytics_workspace_name
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

// Create Azure Container Registry
resource "azurerm_container_registry" "this" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.this.name
  location            = azurerm_resource_group.this.location
  sku                 = "Premium"
  admin_enabled       = false
  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

// Create Key Vault for secrets
resource "azurerm_key_vault" "this" {
  name                      = var.key_vault_name
  location                  = azurerm_resource_group.this.location
  resource_group_name       = azurerm_resource_group.this.name
  tenant_id                 = data.azurerm_client_config.current.tenant_id
  sku_name                  = "standard"
  soft_delete_retention_days = 7
  
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id
    
    key_permissions = [
      "Get", "List", "Create", "Delete", "Update",
    ]
    
    secret_permissions = [
      "Get", "List", "Set", "Delete",
    ]
  }
  
  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

// Get current client config for Key Vault access policy
data "azurerm_client_config" "current" {}

// Create AKS cluster
resource "azurerm_kubernetes_cluster" "this" {
  name                = var.cluster_name
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
  dns_prefix          = var.dns_prefix
  kubernetes_version  = var.kubernetes_version
  
  default_node_pool {
    name                = "default"
    node_count          = var.node_count
    vm_size             = var.vm_size
    vnet_subnet_id      = azurerm_subnet.this.id
    availability_zones  = [1, 2, 3]
    enable_auto_scaling = true
    min_count           = var.node_count
    max_count           = var.node_count * 2
    os_disk_size_gb     = 128
    type                = "VirtualMachineScaleSets"
  }
  
  identity {
    type = "SystemAssigned"
  }
  
  role_based_access_control_enabled = true
  
  network_profile {
    network_plugin     = "azure"
    network_policy     = "calico"
    load_balancer_sku  = "standard"
    service_cidr       = "10.1.0.0/16"
    dns_service_ip     = "10.1.0.10"
    docker_bridge_cidr = "172.17.0.1/16"
  }
  
  addon_profile {
    oms_agent {
      enabled                    = true
      log_analytics_workspace_id = azurerm_log_analytics_workspace.this.id
    }
    kube_dashboard {
      enabled = false
    }
    azure_policy {
      enabled = true
    }
  }
  
  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

// Grant AKS cluster access to ACR
resource "azurerm_role_assignment" "aks_to_acr" {
  scope                = azurerm_container_registry.this.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.this.kubelet_identity[0].object_id
}

// Create an additional node pool for specialized workloads
resource "azurerm_kubernetes_cluster_node_pool" "memory_optimized" {
  name                  = "memopt"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.this.id
  vm_size               = "Standard_E4s_v3"
  node_count            = 2
  availability_zones    = [1, 2, 3]
  enable_auto_scaling   = true
  min_count             = 2
  max_count             = 5
  os_disk_size_gb       = 128
  node_taints           = ["workload=memory:NoSchedule"]
  vnet_subnet_id        = azurerm_subnet.this.id
  
  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
    Workload    = "MemoryIntensive"
  }
}

// Install Helm charts
resource "helm_release" "ingress_nginx" {
  name       = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  namespace  = "ingress-nginx"
  create_namespace = true
  
  set {
    name  = "controller.replicaCount"
    value = "2"
  }
  
  set {
    name  = "controller.nodeSelector\\.kubernetes\\.io/os"
    value = "linux"
  }
  
  set {
    name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/azure-load-balancer-internal"
    value = "true"
  }
  
  depends_on = [azurerm_kubernetes_cluster.this]
}

resource "helm_release" "cert_manager" {
  name       = "cert-manager"
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  namespace  = "cert-manager"
  create_namespace = true
  
  set {
    name  = "installCRDs"
    value = "true"
  }
  
  depends_on = [azurerm_kubernetes_cluster.this]
}

resource "helm_release" "prometheus" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = "monitoring"
  create_namespace = true
  
  set {
    name  = "grafana.enabled"
    value = "true"
  }
  
  set {
    name  = "prometheus.serviceMonitor.relabellings[0].action"
    value = "replace"
  }
  
  depends_on = [azurerm_kubernetes_cluster.this]
}

// Create ClusterIssuer for cert-manager
resource "kubectl_manifest" "cluster_issuer" {
  yaml_body = <<YAML
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
YAML

  depends_on = [helm_release.cert_manager]
}

// Outputs
output "kube_config" {
  value     = azurerm_kubernetes_cluster.this.kube_config_raw
  sensitive = true
}

output "aks_id" {
  value = azurerm_kubernetes_cluster.this.id
}

output "acr_login_server" {
  value = azurerm_container_registry.this.login_server
}

output "key_vault_uri" {
  value = azurerm_key_vault.this.vault_uri
}`,
          exercise: {
            instructions:
              'Create an Infrastructure as Code deployment for a multi-environment AKS application. Your solution should: (1) Use Terraform to provision infrastructure, (2) Include dev, staging, and production environments with different configurations, (3) Set up Azure Container Registry and Key Vault integration, (4) Configure network policies for security, (5) Implement GitOps using Flux for deployment. Bonus: Add monitoring with Prometheus and Grafana.',
          },
        },
        {
          title: 'CI/CD and DevOps Practices (5 Key Concepts)',
          explanation: `
        <p>These five concepts cover essential CI/CD and DevOps practices for modern software delivery pipelines:</p>

        <h4>16. CI/CD Pipelines with Azure DevOps</h4>
        <p>Azure DevOps provides integrated tools for building, testing, and deploying applications through continuous integration and continuous delivery pipelines:</p>

        <p><strong>Key Components:</strong></p>
        <ul>
          <li><strong>Azure Repos</strong>: Git repositories for source code management</li>
          <li><strong>Azure Pipelines</strong>: CI/CD service for automating builds and deployments</li>
          <li><strong>Azure Artifacts</strong>: Package management for dependency management</li>
          <li><strong>Azure Test Plans</strong>: Test management and execution</li>
          <li><strong>Azure Boards</strong>: Agile planning and work item tracking</li>
        </ul>

        <p><strong>Pipeline Concepts:</strong></p>
        <ul>
          <li><strong>YAML Pipelines</strong>: Pipeline definitions stored as code in the repository</li>
          <li><strong>Build Pipelines</strong>: Compile code, run tests, and produce artifacts</li>
          <li><strong>Release Pipelines</strong>: Deploy artifacts to different environments</li>
          <li><strong>Agents</strong>: Servers that run pipeline jobs</li>
          <li><strong>Environments</strong>: Deployment targets with security and approvals</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Example Azure Pipelines YAML for a multi-stage CI/CD pipeline
# azure-pipelines.yml
trigger:
  branches:
    include:
    - main
    - develop
  paths:
    exclude:
    - README.md
    - docs/*

variables:
  containerRegistry: 'myacr.azurecr.io'
  imageName: 'myapp'
  vmImageName: 'ubuntu-latest'
  k8sNamespace: 'myapp'
  devAksName: 'dev-aks-cluster'
  devAksRG: 'dev-aks-rg'
  prodAksName: 'prod-aks-cluster'
  prodAksRG: 'prod-aks-rg'

stages:
- stage: Build
  displayName: 'Build and Test'
  jobs:
  - job: BuildAndTest
    displayName: 'Build and Test App'
    pool:
      vmImage: $(vmImageName)
    steps:
    - task: NodeTool@0
      inputs:
        versionSpec: '14.x'
      displayName: 'Install Node.js'

    - script: |
        npm ci
        npm run lint
      displayName: 'Install dependencies and lint'

    - script: |
        npm test
      displayName: 'Run tests'
      
    - task: PublishTestResults@2
      inputs:
        testResultsFormat: 'JUnit'
        testResultsFiles: '**/junit.xml'
      condition: succeededOrFailed()
      displayName: 'Publish test results'

    - task: PublishCodeCoverageResults@1
      inputs:
        codeCoverageTool: 'Cobertura'
        summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
      displayName: 'Publish code coverage'

    - task: Docker@2
      inputs:
        containerRegistry: 'ACR Connection'
        repository: '$(imageName)'
        command: 'buildAndPush'
        Dockerfile: 'Dockerfile'
        tags: |
          $(Build.BuildNumber)
          latest
      displayName: 'Build and push Docker image'

    - task: HelmInstaller@1
      inputs:
        helmVersionToInstall: 'latest'
      displayName: 'Install Helm'
      
    - task: HelmDeploy@0
      inputs:
        command: 'package'
        chartPath: './charts/$(imageName)'
        destination: '$(Build.ArtifactStagingDirectory)'
        updateDependency: true
      displayName: 'Package Helm chart'
      
    - publish: $(Build.ArtifactStagingDirectory)
      artifact: helm-chart
      displayName: 'Publish Helm chart'

- stage: DeployDev
  displayName: 'Deploy to Dev'
  dependsOn: Build
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
  jobs:
  - deployment: DeployToDev
    displayName: 'Deploy to Dev'
    environment: 'Development'
    pool:
      vmImage: $(vmImageName)
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: helm-chart
            displayName: 'Download Helm chart'
            
          - task: AzureCLI@2
            inputs:
              azureSubscription: 'Dev Subscription'
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                az aks get-credentials -g $(devAksRG) -n $(devAksName) --overwrite-existing
              displayName: 'Get AKS credentials'
              
          - task: HelmDeploy@0
            inputs:
              connectionType: 'None'
              command: 'upgrade'
              chartType: 'FilePath'
              chartPath: '$(Pipeline.Workspace)/helm-chart/$(imageName)-*.tgz'
              releaseName: '$(imageName)-dev'
              namespace: '$(k8sNamespace)'
              overrideValues: 'image.repository=$(containerRegistry)/$(imageName),image.tag=$(Build.BuildNumber),environment=dev'
              install: true
            displayName: 'Deploy to Dev with Helm'
            
          - task: AzureCLI@2
            inputs:
              azureSubscription: 'Dev Subscription'
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                kubectl get svc -n $(k8sNamespace)
                echo "App URL: http://$(kubectl get svc -n $(k8sNamespace) $(imageName)-dev -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
              displayName: 'Get app URL'

- stage: DeployProd
  displayName: 'Deploy to Production'
  dependsOn: Build
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: DeployToProd
    displayName: 'Deploy to Production'
    environment: 'Production'
    pool:
      vmImage: $(vmImageName)
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: helm-chart
            displayName: 'Download Helm chart'
            
          - task: AzureCLI@2
            inputs:
              azureSubscription: 'Prod Subscription'
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                az aks get-credentials -g $(prodAksRG) -n $(prodAksName) --overwrite-existing
              displayName: 'Get AKS credentials'
              
          - task: HelmDeploy@0
            inputs:
              connectionType: 'None'
              command: 'upgrade'
              chartType: 'FilePath'
              chartPath: '$(Pipeline.Workspace)/helm-chart/$(imageName)-*.tgz'
              releaseName: '$(imageName)'
              namespace: '$(k8sNamespace)'
              overrideValues: 'image.repository=$(containerRegistry)/$(imageName),image.tag=$(Build.BuildNumber),environment=prod,replicaCount=3'
              install: true
            displayName: 'Deploy to Production with Helm'
            
          - task: AzureCLI@2
            inputs:
              azureSubscription: 'Prod Subscription'
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                kubectl get svc -n $(k8sNamespace)
                echo "App URL: https://$(kubectl get svc -n $(k8sNamespace) $(imageName) -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
              displayName: 'Get app URL'</code></pre>
        </div>

        <h4>17. Container Registry and Image Management</h4>
        <p>Container registries store and manage Docker images, enabling effective container lifecycle management:</p>

        <p><strong>Key Concepts:</strong></p>
        <ul>
          <li><strong>Image Repositories</strong>: Named collections of related container images</li>
          <li><strong>Image Tags</strong>: Labels that identify specific versions of images</li>
          <li><strong>Image Scanning</strong>: Vulnerability detection in container images</li>
          <li><strong>Geo-replication</strong>: Distribution of images across multiple regions</li>
          <li><strong>Retention Policies</strong>: Automated cleanup of old or unused images</li>
        </ul>

        <p><strong>Azure Container Registry Features:</strong></p>
        <ul>
          <li><strong>Integrated Authentication</strong>: Seamless Azure AD integration</li>
          <li><strong>Tasks</strong>: Build, test, and patch container images in Azure</li>
          <li><strong>Private Endpoints</strong>: Secure access from virtual networks</li>
          <li><strong>Webhook Integration</strong>: Trigger events on image push</li>
          <li><strong>Content Trust</strong>: Image signing and verification</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Azure CLI commands for container registry management
# Create an Azure Container Registry
az acr create --name myRegistry --resource-group myResourceGroup --sku Premium

# Enable admin user (for simple authentication)
az acr update --name myRegistry --admin-enabled true

# Get admin credentials
az acr credential show --name myRegistry

# Log in to registry
az acr login --name myRegistry

# Build and push an image using ACR Tasks
az acr build --registry myRegistry --image myapp:1.0 --file Dockerfile .

# Configure a retention policy (purge untagged manifests older than 30 days)
az acr config retention update --registry myRegistry --status enabled --days 30 --type untagged

# Enable vulnerability scanning
az acr security enable-scan --name myRegistry --resource-group myResourceGroup --scan-policy Basic

// ACR Task to automatically build images on code push
# Create a task that monitors a GitHub repository
az acr task create \
  --registry myRegistry \
  --name buildapp \
  --image myapp:{{.Run.ID}} \
  --image myapp:latest \
  --context https://github.com/username/myapp.git \
  --branch main \
  --file Dockerfile \
  --git-access-token <PAT>

# Manually trigger the task
az acr task run --registry myRegistry --name buildapp

// ACR Task YAML file (acr-task.yaml)
version: v1.1.0
steps:
  # Build web app image
  - build: -t {{.Run.Registry}}/myapp/web:{{.Run.ID}} -t {{.Run.Registry}}/myapp/web:latest ./web
  # Build API image
  - build: -t {{.Run.Registry}}/myapp/api:{{.Run.ID}} -t {{.Run.Registry}}/myapp/api:latest ./api
  # Run unit tests
  - cmd: {{.Run.Registry}}/myapp/api:{{.Run.ID}}
    entrypoint: npm
    args: ["test"]
  # Push images only if tests pass
  - push:
    - {{.Run.Registry}}/myapp/web:{{.Run.ID}}
    - {{.Run.Registry}}/myapp/web:latest
    - {{.Run.Registry}}/myapp/api:{{.Run.ID}}
    - {{.Run.Registry}}/myapp/api:latest
    when: ["$CheckTests"]

// Create a webhook to trigger a webhook when an image is pushed
az acr webhook create \
  --registry myRegistry \
  --name myWebhook \
  --actions push \
  --uri https://myserver.com/webhook

// Dockerfile with multi-stage build for a Node.js app
# Build stage
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
USER node
CMD ["npm", "start"]</code></pre>
        </div>

        <h4>18. Security in CI/CD Pipelines</h4>
        <p>Security is a critical aspect of CI/CD pipelines, ensuring that applications and infrastructure are protected throughout the development lifecycle:</p>

        <p><strong>Key Security Practices:</strong></p>
        <ul>
          <li><strong>Shift-Left Security</strong>: Integrate security early in the development process</li>
          <li><strong>Secret Management</strong>: Secure handling of credentials and sensitive information</li>
          <li><strong>SAST (Static Application Security Testing)</strong>: Code analysis for security vulnerabilities</li>
          <li><strong>DAST (Dynamic Application Security Testing)</strong>: Runtime security testing</li>
          <li><strong>Container Scanning</strong>: Check container images for vulnerabilities</li>
        </ul>

        <p><strong>Security Integration Points:</strong></p>
        <ul>
          <li><strong>Pre-commit Hooks</strong>: Validate code before committing</li>
          <li><strong>Build Pipeline</strong>: Scan dependencies and code</li>
          <li><strong>Container Registry</strong>: Scan images before deployment</li>
          <li><strong>Deployment Gates</strong>: Security approvals before promotion</li>
          <li><strong>Runtime Monitoring</strong>: Detect and respond to security events</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Azure DevOps pipeline with integrated security scanning
# azure-pipelines-security.yml
trigger:
  branches:
    include:
    - main
    - develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  - group: 'security-credentials'  # Variable group containing sensitive credentials

stages:
- stage: SecurityScan
  displayName: 'Security Scanning'
  jobs:
  - job: CodeAnalysis
    displayName: 'Static Code Analysis'
    steps:
    - task: SonarQubePrepare@4
      inputs:
        SonarQube: 'SonarQube Connection'
        scannerMode: 'CLI'
        configMode: 'file'
        configFile: 'sonar-project.properties'
      displayName: 'Prepare SonarQube Analysis'
      
    - task: NodeTool@0
      inputs:
        versionSpec: '14.x'
      displayName: 'Install Node.js'
      
    - script: |
        npm ci
        npm run build
      displayName: 'Build application'
      
    - task: SonarQubeAnalyze@4
      displayName: 'Run SonarQube Analysis'
      
    - task: SonarQubePublish@4
      inputs:
        pollingTimeoutSec: '300'
      displayName: 'Publish SonarQube Results'
      
    - task: WhiteSource@20
      inputs:
        cwd: '$(System.DefaultWorkingDirectory)'
        projectName: '$(Build.Repository.Name)'
      displayName: 'Scan dependencies for vulnerabilities'

  - job: SecretScanning
    displayName: 'Secret Scanning'
    steps:
    - script: |
        npm install -g trufflehog
        trufflehog --regex --entropy=False $(Build.Repository.LocalPath)
      displayName: 'Scan for secrets in codebase'
      continueOnError: true
      
- stage: ContainerSecurity
  displayName: 'Container Security'
  dependsOn: []  # Run in parallel with SecurityScan
  jobs:
  - job: BuildAndScan
    displayName: 'Build and Scan Container'
    steps:
    - task: Docker@2
      inputs:
        command: 'build'
        Dockerfile: 'Dockerfile'
        buildContext: '.'
        repository: 'temp/$(Build.Repository.Name)'
        tags: '$(Build.BuildId)'
      displayName: 'Build container image'
      
    - task: AquaSecurityDockleTask@0
      inputs:
        dockerImage: 'temp/$(Build.Repository.Name):$(Build.BuildId)'
        severity: 'WARN'
        ignoreRules: 'DKL-DI-0006'
      displayName: 'Scan Dockerfile for best practices'
      
    - task: AquaSecurityTrivyTask@0
      inputs:
        trivyVersion: 'latest'
        scanType: 'image'
        image: 'temp/$(Build.Repository.Name):$(Build.BuildId)'
        severities: 'CRITICAL,HIGH'
      displayName: 'Scan container image for vulnerabilities'
      
    - task: Docker@2
      inputs:
        containerRegistry: 'ACR Connection'
        repository: '$(Build.Repository.Name)'
        command: 'push'
        tags: '$(Build.BuildId)'
      displayName: 'Push container image'
      condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))

- stage: ComplianceChecks
  displayName: 'Compliance Checks'
  dependsOn: []  # Run in parallel with other stages
  jobs:
  - job: InfrastructureAsCode
    displayName: 'IaC Security Scanning'
    steps:
    - task: CheckovInstaller@0
      displayName: 'Install Checkov'
      
    - task: CheckovAnalyzer@0
      inputs:
        directory: '$(Build.SourcesDirectory)/infrastructure'
        failOnError: false
      displayName: 'Scan Terraform files for security issues'
      
    - task: KubeScoreInstaller@0
      displayName: 'Install KubeScore'
      
    - task: KubeScoreAnalyzer@0
      inputs:
        directory: '$(Build.SourcesDirectory)/kubernetes'
      displayName: 'Scan Kubernetes manifests for security issues'

// Key Vault integration in Azure DevOps to securely access secrets
# azure-pipelines-vault.yml
# Use a variable group linked to Azure Key Vault
variables:
- group: KeyVaultSecrets  # This variable group is linked to an Azure Key Vault

steps:
- script: |
    echo "Using database connection string: $(DatabaseConnectionString)"
  displayName: 'Example of using a secret from Key Vault'
  env:
    # Never echo actual secrets in logs
    DatabaseConnectionString: $(DatabaseConnectionString)

// Example of configuring SonarQube properties
# sonar-project.properties
sonar.projectKey=myproject
sonar.projectName=My Project
sonar.projectVersion=1.0

sonar.sources=src
sonar.tests=tests
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=**/*.test.js,**/*.spec.js,**/node_modules/**
sonar.exclusions=node_modules/**,coverage/**,dist/**

# Security-specific configuration
sonar.securityhotspots.active=true
sonar.security.sources=src
sonar.security.tests=tests</code></pre>
        </div>

        <h4>19. Deployment Strategies and Progressive Delivery</h4>
        <p>Deployment strategies define how applications are updated in production environments, balancing speed with stability:</p>

        <p><strong>Key Deployment Strategies:</strong></p>
        <ul>
          <li><strong>Rolling Deployment</strong>: Gradually replace instances with new versions</li>
          <li><strong>Blue-Green Deployment</strong>: Switch traffic between two identical environments</li>
          <li><strong>Canary Deployment</strong>: Expose new version to a subset of users</li>
          <li><strong>A/B Testing</strong>: Simultaneously test two versions with different features</li>
          <li><strong>Shadow Deployment</strong>: Test new version with production traffic without affecting users</li>
        </ul>

        <p><strong>Progressive Delivery Components:</strong></p>
        <ul>
          <li><strong>Feature Flags</strong>: Toggle features on/off without redeployment</li>
          <li><strong>Traffic Splitting</strong>: Route requests to different versions</li>
          <li><strong>Automated Rollbacks</strong>: Revert to previous version if issues are detected</li>
          <li><strong>Observability</strong>: Monitor performance and errors for deployment health</li>
          <li><strong>Deployment Markers</strong>: Track deployments in monitoring systems</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Rolling deployment with Kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Max pods created over desired number
      maxUnavailable: 1  # Max pods unavailable during update
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: myapp/frontend:v2
        ports:
        - containerPort: 80
        readinessProbe:   # Ensures new pods are ready before accepting traffic
          httpGet:
            path: /healthz
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5

// Blue-Green deployment with Kubernetes Services
# blue-deployment.yaml (currently active)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
      version: blue
  template:
    metadata:
      labels:
        app: frontend
        version: blue
    spec:
      containers:
      - name: frontend
        image: myapp/frontend:v1
        ports:
        - containerPort: 80

# green-deployment.yaml (new version)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
      version: green
  template:
    metadata:
      labels:
        app: frontend
        version: green
    spec:
      containers:
      - name: frontend
        image: myapp/frontend:v2
        ports:
        - containerPort: 80

# service.yaml (points to blue initially)
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  selector:
    app: frontend
    version: blue  # Switch to green when ready
  ports:
  - port: 80
    targetPort: 80

// Canary deployment with Istio
# canary-routing.yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: frontend
spec:
  hosts:
  - frontend.example.com
  http:
  - route:
    - destination:
        host: frontend-v1
        subset: v1
      weight: 90
    - destination:
        host: frontend-v2
        subset: v2
      weight: 10  # 10% of traffic goes to the canary version

# destination-rule.yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: frontend
spec:
  host: frontend
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2

// Feature flag implementation example with LaunchDarkly
# JavaScript client-side code
import { LDClient } from 'launchdarkly-js-client-sdk';

const ldClient = LDClient.initialize('YOUR_CLIENT_SIDE_ID', {
  key: 'anonymous',
  anonymous: true
});

ldClient.on('ready', () => {
  // Get feature flag value
  const showNewFeature = ldClient.variation('new-feature', false);
  
  if (showNewFeature) {
    // Show new feature
    document.getElementById('new-feature').style.display = 'block';
  }
});

// Server-side feature flags with Node.js
const LaunchDarkly = require('launchdarkly-node-server-sdk');
const ldClient = LaunchDarkly.init('YOUR_SDK_KEY');

ldClient.once('ready', () => {
  // User context
  const user = {
    key: 'user-123',
    email: 'user@example.com',
    custom: {
      groups: ['beta-testers']
    }
  };
  
  ldClient.variation('new-api-endpoint', user, false)
    .then(showNewEndpoint => {
      if (showNewEndpoint) {
        // Use new API endpoint
        app.use('/api/v2', newApiRouter);
      } else {
        // Use old API endpoint
        app.use('/api', oldApiRouter);
      }
    });
});

// Azure DevOps pipeline for automated canary deployment
# azure-pipelines-canary.yml
stages:
- stage: DeployCanary
  displayName: 'Deploy Canary'
  jobs:
  - deployment: DeployCanary
    environment: Production
    strategy:
      runOnce:
        deploy:
          steps:
          - task: KubernetesManifest@0
            inputs:
              action: 'deploy'
              manifests: |
                manifests/deployment-canary.yaml
                manifests/service-canary.yaml
              containers: 'myacr.azurecr.io/myapp:$(Build.BuildNumber)'
          - task: AzureCLI@2
            inputs:
              azureSubscription: 'Production'
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                # Configure Istio traffic splitting: 10% to canary
                kubectl apply -f manifests/istio-canary-10.yaml
            displayName: 'Set Traffic Split - 10%'

- stage: MonitorCanary
  displayName: 'Monitor Canary Health'
  dependsOn: DeployCanary
  jobs:
  - job: MonitorHealth
    steps:
    - task: AzureCLI@2
      inputs:
        azureSubscription: 'Production'
        scriptType: 'bash'
        scriptLocation: 'inlineScript'
        inlineScript: |
          # Query Application Insights for error rate
          ERROR_RATE=$(az monitor app-insights query \
            --app $(appInsightsId) \
            --analytics-query "requests | where timestamp > ago(15m) and cloud_RoleName == 'myapp-canary' | summarize errorRate = sum(success == 'False') * 100.0 / count() | project errorRate" \
            --query [0].errorRate -o tsv)
          
          if (( $(echo "$ERROR_RATE > 5.0" | bc -l) )); then
            echo "Error rate too high: $ERROR_RATE%. Rolling back."
            echo "##vso[task.setvariable variable=shouldPromote;isOutput=true]false"
            exit 1
          else
            echo "Error rate acceptable: $ERROR_RATE%"
            echo "##vso[task.setvariable variable=shouldPromote;isOutput=true]true"
          fi
      name: healthCheck
      displayName: 'Check Canary Health'

- stage: PromoteCanary
  displayName: 'Promote Canary'
  dependsOn: MonitorCanary
  condition: eq(dependencies.MonitorCanary.outputs['healthCheck.shouldPromote'], 'true')
  jobs:
  - deployment: PromoteToProduction
    environment: Production
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureCLI@2
            inputs:
              azureSubscription: 'Production'
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                # Gradually increase traffic
                echo "Increasing traffic to 30%"
                kubectl apply -f manifests/istio-canary-30.yaml
                sleep 300  # Wait 5 minutes
                
                # Check error rate again
                ERROR_RATE=$(az monitor app-insights query \
                  --app $(appInsightsId) \
                  --analytics-query "requests | where timestamp > ago(5m) and cloud_RoleName == 'myapp-canary' | summarize errorRate = sum(success == 'False') * 100.0 / count() | project errorRate" \
                  --query [0].errorRate -o tsv)
                
                if (( $(echo "$ERROR_RATE > 5.0" | bc -l) )); then
                  echo "Error rate too high: $ERROR_RATE%. Rolling back."
                  kubectl apply -f manifests/istio-canary-0.yaml
                  exit 1
                fi
                
                echo "Increasing traffic to 100%"
                kubectl apply -f manifests/istio-canary-100.yaml
                
                # Update the main deployment
                kubectl apply -f manifests/deployment-main.yaml
            displayName: 'Promote Canary'

- stage: RollbackOnFailure
  displayName: 'Rollback on Failure'
  dependsOn:
  - MonitorCanary
  - PromoteCanary
  condition: or(failed('MonitorCanary'), failed('PromoteCanary'))
  jobs:
  - job: Rollback
    steps:
    - task: AzureCLI@2
      inputs:
        azureSubscription: 'Production'
        scriptType: 'bash'
        scriptLocation: 'inlineScript'
        inlineScript: |
          # Redirect all traffic back to the stable version
          kubectl apply -f manifests/istio-canary-0.yaml
          # Delete the canary deployment
          kubectl delete -f manifests/deployment-canary.yaml
      displayName: 'Rollback Deployment'</code></pre>
        </div>

        <h4>20. Observability and Monitoring</h4>
        <p>Observability provides insights into the behavior and health of applications and infrastructure, enabling proactive issue identification and resolution:</p>

        <p><strong>Key Observability Pillars:</strong></p>
        <ul>
          <li><strong>Metrics</strong>: Numerical measurements of system performance</li>
          <li><strong>Logs</strong>: Timestamped records of events</li>
          <li><strong>Traces</strong>: End-to-end request flows through a distributed system</li>
          <li><strong>Dashboards</strong>: Visual representations of system state</li>
          <li><strong>Alerts</strong>: Notifications of significant events or conditions</li>
        </ul>

        <p><strong>Azure Monitoring Tools:</strong></p>
        <ul>
          <li><strong>Azure Monitor</strong>: Unified monitoring platform</li>
          <li><strong>Application Insights</strong>: Application Performance Management (APM)</li>
          <li><strong>Container Insights</strong>: Monitoring for AKS and containerized applications</li>
          <li><strong>Log Analytics</strong>: Log storage and query capabilities</li>
          <li><strong>Azure Dashboard</strong>: Customizable visualization of metrics</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Instrumenting a Node.js application with Application Insights
// Install the SDK: npm install applicationinsights

// app.js
const appInsights = require('applicationinsights');
appInsights.setup('YOUR_INSTRUMENTATION_KEY')
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C);
appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "MyService";
appInsights.start();

// Custom telemetry
const client = appInsights.defaultClient;

// Track a custom event
client.trackEvent({
  name: "UserLoggedIn",
  properties: { userId: "user123", userType: "premium" }
});

// Track a metric
client.trackMetric({
  name: "OrderProcessingTime",
  value: 150  // milliseconds
});

// Track an exception
try {
  throw new Error('Sample error');
} catch (error) {
  client.trackException({ exception: error });
}

// Track a dependency call
client.trackDependency({
  target: "HTTP example.com",
  name: "GET /api/users",
  data: "GET https://example.com/api/users",
  duration: 157,
  resultCode: 200,
  success: true,
  dependencyTypeName: "HTTP"
});

// Custom middleware for Express.js to track HTTP requests with custom properties
const express = require('express');
const app = express();

app.use((req, res, next) => {
  const startTime = Date.now();
  
  // Add response hook
  const originalEnd = res.end;
  res.end = function() {
    const duration = Date.now() - startTime;
    client.trackRequest({
      name: req.path,
      url: req.url,
      duration: duration,
      resultCode: res.statusCode,
      success: res.statusCode < 400,
      properties: {
        'userId': req.user ? req.user.id : 'anonymous',
        'userAgent': req.get('User-Agent'),
        'httpMethod': req.method,
        'customDimension1': req.get('X-Custom-Header')
      }
    });
    return originalEnd.apply(res, arguments);
  };
  
  next();
});

// Azure Monitor Kusto Query Language (KQL) examples
// Query for failed requests
requests
| where timestamp > ago(1h)
| where success == false
| summarize count() by resultCode, bin(timestamp, 5m)
| render timechart

// Query for exceptions
exceptions
| where timestamp > ago(1d)
| summarize count() by type, bin(timestamp, 1h)
| order by count_ desc

// Query for dependency performance
dependencies
| where timestamp > ago(1d)
| summarize avg(duration), percentiles(duration, 50, 95, 99) by target
| order by percentile_duration_99 desc

// Query for user flows
let start = datetime("2023-01-01T00:00:00.000Z");
let end = datetime("2023-01-02T00:00:00.000Z");
let timeGrain = 1h;
let userSessions =
pageViews
| where timestamp between(start..end)
| where operation_Name == "HomePage"
| project userIdSessionId=tostring(user_Id), timestamp;
userSessions
| evaluate funnel(timestamp, 1h,
    userIdSessionId,
    pageViews | where operation_Name == "HomePage",
    pageViews | where operation_Name == "ProductListPage",
    pageViews | where operation_Name == "ProductDetailPage",
    pageViews | where operation_Name == "CartPage",
    pageViews | where operation_Name == "CheckoutPage",
    pageViews | where operation_Name == "ConfirmationPage"
)
| project Step=case(
    PreviousState == "", "Home",
    PreviousState == "pageViews | where operation_Name == \\"HomePage\\"", "Product List",
    PreviousState == "pageViews | where operation_Name == \\"ProductListPage\\"", "Product Detail",
    PreviousState == "pageViews | where operation_Name == \\"ProductDetailPage\\"", "Cart",
    PreviousState == "pageViews | where operation_Name == \\"CartPage\\"", "Checkout",
    PreviousState == "pageViews | where operation_Name == \\"CheckoutPage\\"", "Confirmation",
    "Unknown"
), Percentage=percentage
| render columnchart  

// Prometheus configuration for Kubernetes monitoring (prometheus.yml)
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert.rules.yml"

scrape_configs:
  - job_name: 'kubernetes-apiservers'
    kubernetes_sd_configs:
    - role: endpoints
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
    relabel_configs:
    - action: keep
      source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
      regex: default;kubernetes;https

  - job_name: 'kubernetes-nodes'
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
    kubernetes_sd_configs:
    - role: node
    relabel_configs:
    - action: labelmap
      regex: __meta_kubernetes_node_label_(.+)
    - target_label: __address__
      replacement: kubernetes.default.svc:443
    - source_labels: [__meta_kubernetes_node_name]
      regex: (.+)
      target_label: __metrics_path__
      replacement: /api/v1/nodes/${1}/proxy/metrics

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
    - role: pod
    relabel_configs:
    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
      action: keep
      regex: true
    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
      action: replace
      target_label: __metrics_path__
      regex: (.+)
    - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
      action: replace
      regex: ([^:]+)(?::\\d+)?;(\\d+)
      replacement: $1:$2
      target_label: __address__
    - action: labelmap
      regex: __meta_kubernetes_pod_label_(.+)
    - source_labels: [__meta_kubernetes_namespace]
      action: replace
      target_label: kubernetes_namespace
    - source_labels: [__meta_kubernetes_pod_name]
      action: replace
      target_label: kubernetes_pod_name</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> When interviewing for CI/CD and DevOps positions, focus on demonstrating your experience with end-to-end pipeline creation and automation, as well as your understanding of deployment strategies and security integration.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"Describe your experience setting up CI/CD pipelines for containerized applications"</li>
            <li>"How have you implemented security scanning in your build/deployment process?"</li>
            <li>"Explain the different deployment strategies you've used and when you would choose one over another"</li>
            <li>"How would you handle secrets and sensitive information in a CI/CD pipeline?"</li>
            <li>"Describe how you would set up monitoring and alerting for a microservices application"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete Azure DevOps CI/CD Pipeline for a Microservices Application
// azure-pipelines.yml
trigger:
  branches:
    include:
    - main
    - feature/*
    - bugfix/*
  paths:
    exclude:
    - README.md
    - docs/*

variables:
  # Variable groups linked to Azure Key Vault
  - group: 'common-secrets'
  - group: 'production-secrets'
  
  # Static variables
  - name: vmImageName
    value: 'ubuntu-latest'
  - name: azureSubscription
    value: 'azure-production-subscription'
  - name: acrName
    value: 'companyacr'
  - name: aksName
    value: 'production-aks'
  - name: aksResourceGroup
    value: 'production-aks-rg'
  - name: appInsightsName
    value: 'production-app-insights'
  - name: microservices
    value: '{ "frontend": { "directory": "src/frontend", "port": 80 }, "api": { "directory": "src/api", "port": 3000 }, "auth": { "directory": "src/auth", "port": 4000 } }'

stages:
- stage: Security
  displayName: 'Security Scanning'
  jobs:
  - job: CodeScan
    displayName: 'Code Security Scanning'
    pool:
      vmImage: $(vmImageName)
    steps:
    - task: SonarQubePrepare@4
      inputs:
        SonarQube: 'SonarQube Connection'
        scannerMode: 'CLI'
        configMode: 'file'
        configFile: 'sonar-project.properties'
      displayName: 'Prepare SonarQube Analysis'
    
    - script: |
        # Install dependencies for all microservices
        for ms in $(echo $(microservices) | jq -c 'to_entries[]'); do
          dir=$(echo $ms | jq -r '.value.directory')
          echo "Installing dependencies for $(echo $ms | jq -r '.key')"
          cd $dir
          npm ci
          cd $(System.DefaultWorkingDirectory)
        done
      displayName: 'Install Dependencies'
    
    - script: |
        # Run tests for all microservices
        for ms in $(echo $(microservices) | jq -c 'to_entries[]'); do
          dir=$(echo $ms | jq -r '.value.directory')
          echo "Running tests for $(echo $ms | jq -r '.key')"
          cd $dir
          npm test
          cd $(System.DefaultWorkingDirectory)
        done
      displayName: 'Run Tests'
      
    - task: SonarQubeAnalyze@4
      displayName: 'Run SonarQube Analysis'
      
    - task: SonarQubePublish@4
      inputs:
        pollingTimeoutSec: '300'
      displayName: 'Publish SonarQube Results'
    
    - task: securedevelopmentteam.vss-secure-development-tools.build-task-credscan.CredScan@2
      inputs:
        toolMajorVersion: 'V2'
        scanFolder: '$(Build.SourcesDirectory)'
        suppressionsFile: '$(Build.SourcesDirectory)/security/credscan-suppressions.json'
      displayName: 'Scan for Credentials'
      
    - task: securedevelopmentteam.vss-secure-development-tools.build-task-publishsecurityanalysislogs.PublishSecurityAnalysisLogs@2
      displayName: 'Publish Security Analysis Logs'
      
    - task: securedevelopmentteam.vss-secure-development-tools.build-task-postanalysis.PostAnalysis@1
      inputs:
        CredScan: true
        ToolLogsNotFoundAction: 'Standard'
      displayName: 'Post Analysis'

- stage: Build
  displayName: 'Build and Push Images'
  dependsOn: Security
  condition: succeeded()
  jobs:
  - \${{ each microservice in json(variables.microservices) }}:
    - job: Build_\${{ microservice.Key }}
      displayName: 'Build \${{ microservice.Key }} Service'
      pool:
        vmImage: $(vmImageName)
      variables:
        imageTag: '\${{ microservice.Key }}:$(Build.BuildNumber)'
        fullImageName: '$(acrName).azurecr.io/$(imageTag)'
        directoryPath: '\${{ microservice.Value.directory }}'
        containerPort: '\${{ microservice.Value.port }}'
      steps:
      - task: Docker@2
        inputs:
          containerRegistry: 'ACR Connection'
          repository: '\${{ microservice.Key }}'
          command: 'buildAndPush'
          Dockerfile: '$(directoryPath)/Dockerfile'
          buildContext: '$(directoryPath)'
          tags: |
            $(Build.BuildNumber)
            latest
          arguments: |
            --build-arg PORT=$(containerPort)
        displayName: 'Build and Push \${{ microservice.Key }} Image'
      
      - task: AquaSecurityTrivy@0
        inputs:
          trivyVersion: 'latest'
          scanType: 'image'
          image: '$(fullImageName)'
          severities: 'CRITICAL,HIGH'
          ignoreUnfixed: true
        displayName: 'Scan \${{ microservice.Key }} Image for Vulnerabilities'

  # Build Helm chart
  - job: BuildHelmChart
    displayName: 'Build Helm Chart'
    pool:
      vmImage: $(vmImageName)
    steps:
    - task: HelmInstaller@1
      inputs:
        helmVersionToInstall: 'latest'
      displayName: 'Install Helm'

    - script: |
        # Update the image tags in the Helm chart values file
        for ms in $(echo $(microservices) | jq -c 'to_entries[]'); do
          service=$(echo $ms | jq -r '.key')
          sed -i "s|\${service}.image.tag:.*|\${service}.image.tag: $(Build.BuildNumber)|g" charts/microservices/values.yaml
          sed -i "s|\${service}.image.repository:.*|\${service}.image.repository: $(acrName).azurecr.io/\${service}|g" charts/microservices/values.yaml
        done
      displayName: 'Update Helm Chart Values'
    
    - task: HelmDeploy@0
      inputs:
        command: 'package'
        chartPath: './charts/microservices'
        destination: '$(Build.ArtifactStagingDirectory)'
        updateDependency: true
      displayName: 'Package Helm Chart'
    
    - publish: $(Build.ArtifactStagingDirectory)
      artifact: helm-chart
      displayName: 'Publish Helm Chart'

- stage: DeployDev
  displayName: 'Deploy to Development'
  dependsOn: Build
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: DeployToDev
    displayName: 'Deploy to Dev Environment'
    environment: 'Development'
    pool:
      vmImage: $(vmImageName)
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: helm-chart
            displayName: 'Download Helm Chart'
            
          - task: AzureCLI@2
            inputs:
              azureSubscription: $(azureSubscription)
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                # Get AKS credentials
                az aks get-credentials -n $(aksName) -g $(aksResourceGroup) --overwrite-existing
              displayName: 'Get AKS Credentials'
              
          - task: HelmDeploy@0
            inputs:
              connectionType: 'None'
              command: 'upgrade'
              chartType: 'FilePath'
              chartPath: '$(Pipeline.Workspace)/helm-chart/microservices-*.tgz'
              releaseName: 'microservices-dev'
              namespace: 'microservices-dev'
              valueFile: 'charts/microservices/values-dev.yaml'
              overrideValues: |
                global.environment=development
                global.appInsights.instrumentationKey=$(APP_INSIGHTS_KEY)
                api.dbConnectionString=$(DEV_DB_CONNECTION_STRING)
              install: true
              waitForExecution: true
              arguments: '--create-namespace --timeout 10m'
            displayName: 'Deploy to Dev with Helm'
            env:
              APP_INSIGHTS_KEY: $(appInsightsKey)
              DEV_DB_CONNECTION_STRING: $(devDbConnectionString)
          
          # Run post-deployment integration tests
          - script: |
              # Wait for services to be ready
              sleep 30
              
              # Get the application URL
              API_URL=$(kubectl get svc -n microservices-dev microservices-dev-api -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
              
              # Run integration tests
              cd tests/integration
              npm ci
              API_BASE_URL="http://$API_URL" npm test
            displayName: 'Run Integration Tests'

- stage: DeployStaging
  displayName: 'Deploy to Staging'
  dependsOn: DeployDev
  condition: succeeded()
  jobs:
  - deployment: DeployToStaging
    displayName: 'Deploy to Staging Environment'
    environment: 'Staging'
    pool:
      vmImage: $(vmImageName)
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: helm-chart
            displayName: 'Download Helm Chart'
            
          - task: AzureCLI@2
            inputs:
              azureSubscription: $(azureSubscription)
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                # Get AKS credentials
                az aks get-credentials -n $(aksName) -g $(aksResourceGroup) --overwrite-existing
              displayName: 'Get AKS Credentials'
              
          - task: HelmDeploy@0
            inputs:
              connectionType: 'None'
              command: 'upgrade'
              chartType: 'FilePath'
              chartPath: '$(Pipeline.Workspace)/helm-chart/microservices-*.tgz'
              releaseName: 'microservices-staging'
              namespace: 'microservices-staging'
              valueFile: 'charts/microservices/values-staging.yaml'
              overrideValues: |
                global.environment=staging
                global.appInsights.instrumentationKey=$(APP_INSIGHTS_KEY)
                api.dbConnectionString=$(STAGING_DB_CONNECTION_STRING)
              install: true
              waitForExecution: true
              arguments: '--create-namespace --timeout 10m'
            displayName: 'Deploy to Staging with Helm'
            env:
              APP_INSIGHTS_KEY: $(appInsightsKey)
              STAGING_DB_CONNECTION_STRING: $(stagingDbConnectionString)
          
          # Run load tests
          - script: |
              # Wait for services to be ready
              sleep 30
              
              # Get the application URL
              API_URL=$(kubectl get svc -n microservices-staging microservices-staging-api -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
              
              # Run load tests with k6
              cd tests/performance
              npm ci
              API_BASE_URL="http://$API_URL" npx k6 run load-test.js
            displayName: 'Run Load Tests'

          # Setup monitoring and alerting
          - task: AzureCLI@2
            inputs:
              azureSubscription: $(azureSubscription)
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                # Create alert rule for high error rate
                az monitor alert-rule create \
                  --name "HighErrorRate-Staging" \
                  --resource-group $(aksResourceGroup) \
                  --target-resource-id "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$(aksResourceGroup)/providers/Microsoft.Insights/components/$(appInsightsName)" \
                  --condition "metrics[name='requests/failed'] > 5" \
                  --action-group "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$(aksResourceGroup)/providers/Microsoft.Insights/actionGroups/DevOpsOnCall" \
                  --description "High error rate in staging environment"
              displayName: 'Set Up Monitoring Alerts'

- stage: CanaryDeployment
  displayName: 'Canary Deployment to Production'
  dependsOn: DeployStaging
  condition: succeeded()
  jobs:
  - deployment: DeployCanary
    displayName: 'Deploy Canary to Production'
    environment: 'Production'
    pool:
      vmImage: $(vmImageName)
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: helm-chart
            displayName: 'Download Helm Chart'
            
          - task: AzureCLI@2
            inputs:
              azureSubscription: $(azureSubscription)
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                # Get AKS credentials
                az aks get-credentials -n $(aksName) -g $(aksResourceGroup) --overwrite-existing
              displayName: 'Get AKS Credentials'
              
          # Deploy the canary version (10% of traffic)
          - task: HelmDeploy@0
            inputs:
              connectionType: 'None'
              command: 'upgrade'
              chartType: 'FilePath'
              chartPath: '$(Pipeline.Workspace)/helm-chart/microservices-*.tgz'
              releaseName: 'microservices-canary'
              namespace: 'microservices-prod'
              valueFile: 'charts/microservices/values-canary.yaml'
              overrideValues: |
                global.environment=production
                global.isCanary=true
                global.canaryWeight=10
                global.appInsights.instrumentationKey=$(APP_INSIGHTS_KEY)
                api.dbConnectionString=$(PROD_DB_CONNECTION_STRING)
              install: true
              waitForExecution: true
              arguments: '--create-namespace --timeout 10m'
            displayName: 'Deploy Canary to Production with Helm'
            env:
              APP_INSIGHTS_KEY: $(appInsightsKey)
              PROD_DB_CONNECTION_STRING: $(prodDbConnectionString)
              
          # Monitor canary for 15 minutes
          - script: |
              # Wait for services to be ready
              sleep 60
              
              # Monitor for 15 minutes
              for i in {1..15}; do
                # Query Application Insights for error rate
                ERROR_RATE=$(az monitor app-insights query \
                  --app $(appInsightsName) \
                  --analytics-query "requests | where timestamp > ago(2m) and cloud_RoleName contains 'canary' | summarize errorRate = 100.0 * sumif(itemCount, success == false) / sum(itemCount) | project errorRate" \
                  --query [0].errorRate -o tsv)
                
                echo "Current error rate: $ERROR_RATE%"
                
                if (( $(echo "$ERROR_RATE > 5.0" | bc -l) )); then
                  echo "Error rate too high: $ERROR_RATE%. Aborting canary deployment."
                  echo "##vso[task.setvariable variable=canaryStatus;isOutput=true]failed"
                  exit 1
                fi
                
                echo "Minute $i of 15: Error rate acceptable"
                sleep 60
              done
              
              echo "Canary deployment monitoring completed successfully"
              echo "##vso[task.setvariable variable=canaryStatus;isOutput=true]success"
            name: monitorCanary
            displayName: 'Monitor Canary Deployment'
            continueOnError: true

- stage: ProductionDeployment
  displayName: 'Deploy to Production'
  dependsOn: CanaryDeployment
  condition: succeeded()
  jobs:
  - deployment: DeployToProduction
    displayName: 'Deploy to Production Environment'
    environment: 'Production'
    pool:
      vmImage: $(vmImageName)
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: helm-chart
            displayName: 'Download Helm Chart'
            
          - task: AzureCLI@2
            inputs:
              azureSubscription: $(azureSubscription)
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                # Get AKS credentials
                az aks get-credentials -n $(aksName) -g $(aksResourceGroup) --overwrite-existing
              displayName: 'Get AKS Credentials'
              
          # Deploy the production version (gradually replace the stable version)
          - task: HelmDeploy@0
            inputs:
              connectionType: 'None'
              command: 'upgrade'
              chartType: 'FilePath'
              chartPath: '$(Pipeline.Workspace)/helm-chart/microservices-*.tgz'
              releaseName: 'microservices-prod'
              namespace: 'microservices-prod'
              valueFile: 'charts/microservices/values-prod.yaml'
              overrideValues: |
                global.environment=production
                global.appInsights.instrumentationKey=$(APP_INSIGHTS_KEY)
                api.dbConnectionString=$(PROD_DB_CONNECTION_STRING)
              install: true
              waitForExecution: true
              arguments: '--timeout 15m'
            displayName: 'Deploy to Production with Helm'
            env:
              APP_INSIGHTS_KEY: $(appInsightsKey)
              PROD_DB_CONNECTION_STRING: $(prodDbConnectionString)
          
          # Gradually shift traffic
          - task: AzureCLI@2
            inputs:
              azureSubscription: $(azureSubscription)
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                # Update the traffic weight to send 50% to the new version
                kubectl apply -f kubernetes/istio/50-50-split.yaml -n microservices-prod
                
                # Wait for 5 minutes to monitor
                sleep 300
                
                # Check if there are any errors in the new version
                ERROR_RATE=$(az monitor app-insights query \
                  --app $(appInsightsName) \
                  --analytics-query "requests | where timestamp > ago(5m) and cloud_RoleName contains 'prod' and not(cloud_RoleName contains 'canary') | summarize errorRate = 100.0 * sumif(itemCount, success == false) / sum(itemCount) | project errorRate" \
                  --query [0].errorRate -o tsv)
                
                if (( $(echo "$ERROR_RATE > 5.0" | bc -l) )); then
                  echo "Error rate too high: $ERROR_RATE%. Rolling back."
                  kubectl apply -f kubernetes/istio/rollback-traffic.yaml -n microservices-prod
                  exit 1
                fi
                
                # Update traffic to 100% to the new version
                kubectl apply -f kubernetes/istio/100-new-traffic.yaml -n microservices-prod
                
                # Clean up canary deployment
                helm uninstall microservices-canary -n microservices-prod
              displayName: 'Manage Traffic Migration'
          
          # Add deployment marker to Application Insights
          - task: AzureCLI@2
            inputs:
              azureSubscription: $(azureSubscription)
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                # Create a deployment marker
                az monitor app-insights annotation create \
                  --resource-group $(aksResourceGroup) \
                  --app $(appInsightsName) \
                  --category "Deployment" \
                  --name "Production Deployment - $(Build.BuildNumber)" \
                  --properties "{\\"BuildNumber\\":\\"$(Build.BuildNumber)\\",\\"CommitId\\":\\"$(Build.SourceVersion)\\",\\"Repository\\":\\"$(Build.Repository.Name)\\"}"
              displayName: 'Create Deployment Marker'

- stage: Rollback
  displayName: 'Rollback if Needed'
  dependsOn:
  - CanaryDeployment
  - ProductionDeployment
  condition: failed()
  jobs:
  - job: RollbackDeployment
    displayName: 'Rollback Deployment'
    pool:
      vmImage: $(vmImageName)
    steps:
    - task: AzureCLI@2
      inputs:
        azureSubscription: $(azureSubscription)
        scriptType: 'bash'
        scriptLocation: 'inlineScript'
        inlineScript: |
          # Get AKS credentials
          az aks get-credentials -n $(aksName) -g $(aksResourceGroup) --overwrite-existing
          
          # Roll back to previous version
          if [ -n "$(kubectl get deploy -n microservices-prod -l app.kubernetes.io/instance=microservices-prod-previous -o name)" ]; then
            echo "Rolling back to previous production version"
            kubectl apply -f kubernetes/istio/rollback-traffic.yaml -n microservices-prod
            
            # Wait for traffic to be redirected
            sleep 60
            
            # Clean up failed deployments
            helm uninstall microservices-canary -n microservices-prod --ignore-not-found
            
            # Add rollback annotation
            az monitor app-insights annotation create \
              --resource-group $(aksResourceGroup) \
              --app $(appInsightsName) \
              --category "Rollback" \
              --name "Rollback from $(Build.BuildNumber)" \
              --properties "{\\"BuildNumber\\":\\"$(Build.BuildNumber)\\",\\"CommitId\\":\\"$(Build.SourceVersion)\\",\\"Repository\\":\\"$(Build.Repository.Name)\\"}"
          else
            echo "No previous version found to roll back to"
          fi
      displayName: 'Perform Rollback'`,
          exercise: {
            instructions:
              'Design a comprehensive CI/CD workflow for a microservices application hosted on AKS. Your solution should include: (1) Azure DevOps pipeline definition for building and deploying microservices, (2) Security scanning integration at all stages, (3) Progressive deployment with canary or blue-green strategy, (4) Automated testing and validation, (5) Rollback mechanisms in case of failures, (6) Monitoring and observability setup.',
          },
        },
      ],
      summary: {
        title: 'Azure DevOps Shortlist Recap',
        content: `
        <p>This guide covered 20 essential Azure DevOps concepts for containerized applications and microservices architecture.</p>
        
        <h3>Key Takeaways:</h3>
        <ol>
          <li><strong>Cloud Fundamentals</strong>: Understanding Azure App Services, Networking, Storage, Resource Manager, and Monitoring forms the foundation for cloud deployments.</li>
          <li><strong>Containerization</strong>: Docker containers paired with Kubernetes orchestration via AKS enables scalable, resilient microservices architectures.</li>
          <li><strong>Infrastructure as Code</strong>: Tools like Terraform, Helm, and Bicep allow you to define infrastructure in a declarative, version-controlled manner, enabling consistency and repeatability.</li>
          <li><strong>CI/CD Pipelines</strong>: Automated pipelines with integrated security scanning and testing ensure reliable, secure deployments.</li>
          <li><strong>Progressive Delivery</strong>: Advanced deployment strategies like canary and blue-green deployments reduce risk and enable continuous delivery.</li>
        </ol>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Practice implementing each concept with hands-on labs</li>
          <li>Focus on integrating security throughout the entire pipeline</li>
          <li>Build expertise in observability to ensure reliable operations</li>
          <li>Learn GitOps practices for Kubernetes-native deployments</li>
          <li>Explore advanced topics like service meshes and chaos engineering</li>
        </ul>
        
        <p>Remember that DevOps is as much about culture and process as it is about technology. Focus on building practices that emphasize collaboration, automation, measurement, and continuous improvement.</p>
        `,
      },
    },
  ],
}

// Export the prepper
export default shortlistPrepper
