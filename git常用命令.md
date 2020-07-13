### 1、基础使用

`git add `：将被修改的文件提交到暂存区

`git commit`：将暂存区的文件提交到分支

```bash
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."
```

`git add `和`git commit`区别：

**简单理解为，需要提交的文件修改通通放到暂存区，然后一次性提交暂存区的所有修改** 



`git status` ：命令可以让我们时刻掌握仓库当前的状态

`git diff `：命令可以看到文件修改的具体内容

`git reset`：版本回滚

`git checkout`：其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可 以“一键还原”。

*注意：从来没有被添加到版本库就被删除的文件，是无法恢复的！*

### 2、分支管理

##### 查看分支

```bash
$ git branch
```

**`git branch` 命令会列出所有分支，当前分支前面会标一个`* ` 号。**

##### 创建分支

```bash
$ git branch "分支名"
```

##### 切换分支

```bash
$ git checkout "分支名"
```

##### 创建并切换分支

```bash
$ git checkout -b "分支名"
```

##### 合并分支

```bash
$ git merge "分支名"
```

##### 删除分支

```bash
$ git branch -d "分支名"
```

### 3、标签管理

##### 创建标签

```bash
$ git branch //查看当前分支
$ git checkout master //切换至主分支
$ git tag v1.0
```

*这样就给master分支中最新的一个版本打上了标签(v1.0)*

##### 给历史的某个节点补标签

```bash
$ git tag v0.9 b7d5d8ec // git tag 版本号 需要打标签的那个commit的版本号
```

##### 查看标签列表

```bash
$ git tag 
```

*注意，标签不是按时间顺序列出，而是按字母排序的*

##### 查看特定标签的提交信息

```bash
$ git show v0.9
```

##### 创建带说明的标签

```bash
$ git tag -a v0.1 -m "version 0.1 初始版" 01ec74f75
```

*还可以创建带有说明的标签，用 `-a` 指定标签名，` -m`指定说明文字：*

##### 删除标签

```bash
$ git tag -d v0.1
```

##### 通过标签推送到远程库

```bash
$ git push origin v1.0
```

*或者，一次性推送全部尚未推送到远程的本地标签：*

```bash
$ git push origin --tags
```





### 4、关联远程库

##### 创建SSH Key：

```bash
$ ssh-keygen -t rsa -C "xxxx@xxx.com"
```

`id_rsa`：私钥

`id_rsa.pub`：公钥

##### 将本地仓库与远端仓库建立链接

```bash
$ git remote add origin git@github.com:xxxxx/xxxxxx.git
```

##### 把本地库的所有内容推送到远程库上

```bash
$ git push -u origin "分支名"
```

*我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。*

##### 之后只要本地作了提交，就可以通过命令把当前分支推送到远程库

```bash
$ git push origin "分支名"
```





