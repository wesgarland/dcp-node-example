# dcp-node-example
NodeJS Example project for DCP

Fork this github repository to get running quickly with DCP on NodeJS.

## Important files
| Filename                    | Contents                                                 |
|:----------------------------|----------------------------------------------------------|
| ~/.dcp/id.keystore          | Your DCP identity proxy keystore                         |
| ~/.dcp/default.keystore     | The DCP bank account key to use for paying for work      |

## Environment Variables
| Variable                    | Behaviour                                                |
|:----------------------------|----------------------------------------------------------|
| DCP_XHR_DEBUG               | Shows network traffic on the console                     |
| DCP_XHR_PROXY               | Set url of HTTP proxy server                             |

### FAQ

#### Where do I get an identity proxy keystore?
Visit https://portal.distributed.computer/, then
- Portal
- Profile
- Identity Keys
- Bottom right, green plus

#### Where do I get a bank account keystore?
Visit https://portal.distributed.computer/, then
- Wallet
- Accounts
- Default
- Click down-pointing chevron
- Click download

#### I don't want people using my identity proxy anymore. Can I revoke it?
Yes, remove it from the same screen in portal that you created it with, 
and it will become invalid immediately. 

#### I shared my bank account keystore and passphrase by accident. What should I do?
- Visit the portal
- Create a new bank account
- Transfer all your DCC into the new account
- Remove the old account

#### Can I use the node command line debugger with DCP Client?
No; the node debugger does not interoperate with programs that require you to 
type passwords. You should use the GUI debuggers instead; node inspector or vscode. If
you are a die-hard CLI user, you can also try our experimental debugger, niim:

```
# sudo npm install --global niim

[sudo] password for wes: 
/usr/bin/niim -> /usr/lib/node_modules/niim/niim 
+ niim@1.11.6-g
updated 1 package in 2.371s 

# niim 
./events.js 
| niim: Node-Inspector IMproved - initialized
< Debugger listening on ws://127.0.0.1:34117/f1956572-a327-40b2-b70a-20a8b9961228 
< For help, see: https://nodejs.org/en/docs/inspector 
< Debugger attached.

Break on start in events.js:1
> 1 
  2 /**
  3  * @file        events.js
niim> c
< new ready state: exec
Enter passphrase to unlock keystore 'hello-staging': 

niim> ctty
< entering interactive terminal mode, ^C to exit (niim)
*****
new ready state: deploying
Enter passphrase to unlock keystore 'hello-staging': *****
new ready state: authorizeHold
new ready state: authorizeFeeStructure
 - Job accepted by scheduler, waiting for results
 - Job has id 0x7f8bd7b58e99f4dc5e9e26d4d898707f079368e484dfb0b52876458c9c7b7edfeb0cabb6c7cb8eb362c192c9d198d2d718e99aeb08f4d1edf5cfcf60ad1101029a
new ready state: deployed
<CONTROL-C>
| exited interactive terminal mode
niim>
```
