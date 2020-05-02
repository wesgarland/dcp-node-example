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

### Getting Started
You will need Node 10 in your path.  If you have an older version of NodeJS, use `nvm`; see
instructions in the FAQ. Additionally, you will need to copy your identity and bank account
keystores from the DCP Portal into your home directory.

```
# mkdir ~/.dcp
# cp ~/Downloads/id.keystore ~/.dcp
# cp ~/Downloads/default.keystore ~/.dcp
# git clone git@github.com:wesgarland/dcp-node-example.git
# cd dcp-node-example
# npm i
# ./events.js
```

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

#### What versions of NodeJS are supported?
We are currently testing Node 10 LTS, version 10.20.

If your operating system has a different version of NodeJS, we suggest using `nvm` to
run Node 10 until we can upgrade our crypto libraries. Visit `https://nvm.sh/` to
download `nvm`.

```# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 13527  100 13527    0     0   113k      0 --:--:-- --:--:-- --:--:--  113k
=> Downloading nvm from git to '/Users/wes/.nvm'
=> Cloning into '/Users/wes/.nvm'...
remote: Enumerating objects: 290, done.
remote: Counting objects: 100% (290/290), done.
remote: Compressing objects: 100% (257/257), done.
remote: Total 290 (delta 35), reused 97 (delta 20), pack-reused 0
Receiving objects: 100% (290/290), 163.27 KiB | 2.97 MiB/s, done.
Resolving deltas: 100% (35/35), done.
=> Compressing and cleaning up git repository

=> nvm source string already in /Users/wes/.bashrc
=> bash_completion source string already in /Users/wes/.bashrc
=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completio

# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# nvm install Dubnium
Downloading and installing node v10.20.1...
Downloading https://nodejs.org/dist/v10.20.1/node-v10.20.1-darwin-x64.tar.xz...
################################################################################################# 100.0%
Computing checksum with shasum -a 256
Checksums matched!
Now using node v10.20.1 (npm v6.14.4)
! WARNING: Version 'Dubnium' does not exist.
Creating default alias: default -> Dubnium (-> N/A)
#
```

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

#### Why does it take so long to get my results back?
Our scheduler is very busy!

We do prioritize work based on your *bid price*.  This is the value per slice assigned 
during to the call to `compute.exec()`. 

We also have a slow-start period which is designed to measure the work you have submitted,
ensure that it is well-behaved, and so on.  This means that we will hold back your work
until we get results back for 5-10 slices.
