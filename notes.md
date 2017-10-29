```bash
~/documents/mapping/map675/module-02$
sudo npm install -g mapshaper
Password:
    /usr/local/bin/mapshaper -> /usr/local/lib/node_modules/mapshaper/bin/mapshaper
    /usr/local/bin/mapshaper-gui -> /usr/local/lib/node_modules/mapshaper/bin/mapshaper-gui
    + mapshaper@0.4.55
    added 13 packages in 2.148s
    ~/documents/mapping/map675/module-02$ cd project-files
    ~/documents/mapping/map675/module-02/project-files$ ls -l
    total 3672
```


```bash
Marks-MacBook-Pro:module-02 mark$
pwd
    /Users/mark/Documents/mapping/map675/module-02

Marks-MacBook-Pro:module-02 mark$

    mapshaper -v
        0.4.55

Marks-MacBook-Pro:module-02 mark$

mkdir data
```
```bash
Marks-MacBook-Pro:module-02 mark$

cd project-files && curl -LOk http://www2.census.gov/geo/tiger/GENZ2016/shp/cb_2016_us_county_20m.zip

          % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                         Dload  Upload   Total   Spent    Left  Speed
          0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0
        100  858k  100  858k    0     0   223k      0  0:00:03  0:00:03 --:--:--  821k

Marks-MacBook-Pro:project-files mark$

unzip cb_2016_us_county_20m.zip

        Archive:  cb_2016_us_county_20m.zip
          inflating: cb_2016_us_county_20m.shp.ea.iso.xml
          inflating: cb_2016_us_county_20m.shp.iso.xml
          inflating: cb_2016_us_county_20m.shp.xml
          inflating: cb_2016_us_county_20m.shp
          inflating: cb_2016_us_county_20m.shx
          inflating: cb_2016_us_county_20m.dbf
          inflating: cb_2016_us_county_20m.prj
         extracting: cb_2016_us_county_20m.cpg
```
```bash
    Marks-MacBook-Pro:project-files mark$

    ogrinfo cb_2016_us_county_20m.shp cb_2016_us_county_20m -so

            INFO: Open of `b_2016_us_county_20m.shp'
                  using driver `ESRI Shapefile' successful.

            Layer name: cb_2016_us_county_20m
            Geometry: Polygon
            Feature Count: 3220
            Extent: (-179.174265, 17.913769) - (179.773922, 71.352561)
            Layer SRS WKT:
            GEOGCS["GCS_North_American_1983",
                DATUM["North_American_Datum_1983",
                    SPHEROID["GRS_1980",6378137,298.257222101]],
                PRIMEM["Greenwich",0],
                UNIT["Degree",0.017453292519943295]]
            STATEFP: String (2.0)
            COUNTYFP: String (3.0)
            COUNTYNS: String (8.0)
            AFFGEOID: String (14.0)
            GEOID: String (5.0)
            NAME: String (100.0)
            LSAD: String (2.0)
            ALAND: Real (14.0)
            AWATER: Real (14.0)

```
```bash
Marks-MacBook-Pro:project-files mark$

mapshaper cb_2016_us_county_20m.shp cb_2016_us_county_20m -info

    [info]
    Layer 1 *
    Layer name: cb_2016_us_county_20m
    Records: 3,220
    Geometry
      Type: polygon
      Bounds: -179.174265 17.913769 179.773922 71.352561
      Proj.4: +proj=longlat +datum=NAD83
    Attribute data
      Field     First value
      AFFGEOID  '0500000US39131'
      ALAND     1140324458
      AWATER       9567612
      COUNTYFP  '131'
      COUNTYNS  '01074078'
      GEOID     '39131'
      LSAD      '06'
      NAME      'Pike'
      STATEFP   '39'

    [i] Error: File not found (cb_2016_us_county_20m)
    Run mapshaper -h to view help
```

Use ogr2ogr to convert the Shapefiles to WGS84

```bash
ogr2ogr counties_wgs84.shp  -t_srs "EPSG:4326" cb_2016_us_county_20m.shp
```
create a file called apps.js and place Hello World in it
```bash
cd mapping/map675
cd module-02
touch app.js
open app.js
```
Install mapshaper
```bash
sudo npm install -g mapshaper
mapshaper -v
```
Create a data folder
Use curl to download US County data
```bash
mkdir data
cd project-files && curl -LOk http://www2.census.gov/geo/tiger/GENZ2016/shp/cb_2016_us_county_20m.zip
unzip cb_2016_us_county_20m.zip
```
See how ogr2ogr and mapshaper can view Shapefiles
```bash
ogrinfo cb_2016_us_county_20m.shp cb_2016_us_county_20m -so
mapshaper cb_2016_us_county_20m.shp cb_2016_us_county_20m -info
```
Mapshaper does offer support for projection conversion, it does NOT support coordinate system transformations.
Use ogr2ogr to convert the Shapefiles to WGS84.
```bash
ogr2ogr counties_wgs84.shp  -t_srs "EPSG:4326" cb_2016_us_county_20m.shp

```
pwd  -- check current directory is project-files
create geojson file from counties data
```bash
mapshaper counties_wgs84.shp -simplify dp 20% -o format=geojson ../data/us-counties.json

```
File is kinda big. Filter the fields using mapshaper
```bash
mapshaper counties_wgs84.shp -filter-fields COUNTYFP,NAME -simplify dp 15% -o precision=.0001 format=geojson ../data/us-counties2.json
```
Check file size again.  It is smaller

Mapshaper can also be used to modify existing GeoJSON files
```bash
mapshaper project-files/austin-council-districts.json -filter-fields council_di -simplify 20% -o precision=.0001 data/austin-districts.json

```
Comparing the two files using 'mapshaper -info' shows that filter leave only 1 fields
```bash ~/documents/mapping/map675/module-02> mapshaper project-files/austin-council-districts.json -info
[info]
Layer 1 *
Layer name: austin-council-districts
Records: 10
Geometry
  Type: polygon
  Bounds: -97.93835459034858 30.075576149548436 -97.52758699699463 30.516623657269527
  Proj.4: +proj=longlat +datum=WGS84
Attribute data
  Field       First value
  council_di  '5'
  created_by  'meekss'
  created_da  '2014-06-02T00:00:00.000Z'
  modified_b  'meekss'
  modified_d  '2016-01-25T00:00:00.000Z'
  shape_area  '666748826.784'
  shape_len   '348276.233728'
  single_mem  '5'

 ~/documents/mapping/map675/module-02> mapshaper mapshaper project-files/austin-council-json -info
[info]
Layer 1 *
Layer name: austin-council-districts
Records: 10
Geometry
  Type: polygon
  Bounds: -97.93835459034858 30.075576149548436 -97.52758699699463 30.516623657269527
  Proj.4: +proj=longlat +datum=WGS84
Attribute data
  Field       First value
  council_di  '5'
  created_by  'meekss'
  created_da  '2014-06-02T00:00:00.000Z'
  modified_b  'meekss'
  modified_d  '2016-01-25T00:00:00.000Z'
  shape_area  '666748826.784'
  shape_len   '348276.233728'
  single_mem  '5'

 ~/documents/mapping/map675/module-02

 ```
 Checkout the Github wiki on mapshaper:[Introduction to the Command Line Tool](https://github.com/mbloch/mapshaper/wiki/Introduction-to-the-Command-Line-Tool)


 ## initializing a npm project
```bash

   ╭─────────────────────────────────────╮
   │                                     │
   │   Update available 5.4.2 → 5.5.1    │
   │     Run npm i -g npm to update      │
   │                                     │
   ╰─────────────────────────────────────╯

 ~/documents/mapping/map675/module-02> npm i -g npm
npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules/npm/node_modules/aproba
npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules/npm/node_modules/abbrev
npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules/npm/node_modules/npm-packlist
npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules/npm/node_modules/request/node_modules/aws-sign2
npm WARN checkPermissions Missing write access to
.
.
.
 ~/documents/mapping/map675/module-02> sudo npm i -g npm
Password:
/usr/local/bin/npx -> /usr/local/lib/node_modules/npm/bin/npx-cli.js
/usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm-cli.js
+ npm@5.5.1
added 52 packages, removed 2 packages and updated 29 packages in 9.091s

```

npm init --yes
```bash
~/documents/mapping/map675/module-02> npm init --yes
Wrote to /Users/mark/Documents/mapping/map675/module-02/package.json:

{
 "name": "module-02",
 "version": "1.0.0",
 "description": "",
 "main": "app.js",
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "start": "node server.js"
 },
 "keywords": [],
 "author": "",
 "license": "ISC"
}
~/documents/mapping/map675/module-02>
```
At this  point the working folder will have a package.json file

```bash
~/documents/mapping/map675/module-02> ls -l
total 40
-rw-r--r--   1 mark  staff     0 Oct 29 08:49 app.js
drwxr-xr-x   5 mark  staff   170 Oct 29 10:32 data
-rw-r--r--@  1 mark  staff  1367 Oct 29 10:22 index.html
-rw-r--r--@  1 mark  staff  8776 Oct 29 10:56 notes.md
-rw-r--r--   1 mark  staff   252 Oct 29 10:49 package.json     <<<<=======
drwxr-xr-x  19 mark  staff   646 Oct 29 10:35 project-files
~/documents/mapping/map675/module-02>
```
Opening the file with more shows:
```bash
~/documents/mapping/map675/module-02> more package.json
{
 "name": "module-02",
 "version": "1.0.0",
 "description": "",
 "main": "app.js",
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "start": "node server.js"
 },
 "keywords": [],
 "author": "",
 "license": "ISC",
}
~/documents/mapping/map675/module-02>
```
package.json keeps track of all the npm packages installed as well as running useful scripts


##install additional packages with npm
npm install <package name>
```bash
~/documents/mapping/map675/module-02> npm install chalk
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN module-02@1.0.0 No description
npm WARN module-02@1.0.0 No repository field.

+ chalk@2.3.0
added 7 packages in 3.75s
~/documents/mapping/map675/module-02>
```
After the installation of Chalk the package.json has been updated with a dependencies section
```bash
~/documents/mapping/map675/module-02> more package.json

 "dependencies": {
   "chalk": "^2.3.0"
 }

~/documents/mapping/map675/module-02>
```
Listing the folder contents shows a new folder call node_modules
```bash
~/documents/mapping/map675/module-02> ls -l
total 48
-rw-r--r--   1 mark  staff      0 Oct 29 08:49 app.js
drwxr-xr-x   5 mark  staff    170 Oct 29 10:32 data
-rw-r--r--@  1 mark  staff   1367 Oct 29 10:22 index.html
drwxr-xr-x   9 mark  staff    306 Oct 29 10:58 node_modules
-rw-r--r--@  1 mark  staff  10320 Oct 29 11:07 notes.md
-rw-r--r--   1 mark  staff   1917 Oct 29 10:58 package-lock.json
-rw-r--r--   1 mark  staff    299 Oct 29 10:58 package.json
drwxr-xr-x  19 mark  staff    646 Oct 29 10:35 project-files
~/documents/mapping/map675/module-02> ls -l
```
Examining the contents of node_modules there are 7 folders. Among them is the newly installed package Chalk
```bash
~/documents/mapping/map675/module-02> ls -l node_modules
total 0
drwxr-xr-x  6 mark  staff  204 Oct 29 10:58 ansi-styles
drwxr-xr-x  8 mark  staff  272 Oct 29 10:58 chalk
drwxr-xr-x  9 mark  staff  306 Oct 29 10:58 color-convert
drwxr-xr-x  9 mark  staff  306 Oct 29 10:58 color-name
drwxr-xr-x  6 mark  staff  204 Oct 29 10:58 escape-string-regexp
drwxr-xr-x  6 mark  staff  204 Oct 29 10:58 has-flag
drwxr-xr-x  7 mark  staff  238 Oct 29 10:58 supports-color
~/documents/mapping/map675/module-02>
```
Examining the package.json reveals another section of dependencies which are some of the folders in node_modules.
There is also a section of scripts which are contained within the folders.
```bash
~/documents/mapping/map675/module-02> more node_modules/chalk/package.json
.
.
.
 "dependencies": {
   "ansi-styles": "^3.1.0",
   "escape-string-regexp": "^1.0.5",
   "supports-color": "^4.0.0"
 }
 .
 .
 .
 "scripts": {
   "bench": "matcha benchmark.js",
   "coveralls": "nyc report --reporter=text-lcov | coveralls",
   "test": "xo && tsc --project types && nyc ava"
 }
~/documents/mapping/map675/module-02>
```
Initialize git
```bash
~/documents/mapping/map675/module-02> git init
Initialized empty Git repository in /Users/mark/Documents/mapping/map675/module-02/.git/
~/documents/mapping/map675/module-02>
```
The initialized folder is hidden (hiddle). To show it use the -a flag with ls.
```bash
~/documents/mapping/map675/module-02> ls -la
total 56
drwxr-xr-x  12 mark  staff    408 Oct 29 11:19 .
drwxr-xr-x   8 mark  staff    272 Oct 29 07:21 ..
drwxr-xr-x  10 mark  staff    340 Oct 29 11:19 .git
-rw-r--r--   1 mark  staff      0 Oct 29 08:49 app.js
drwxr-xr-x   5 mark  staff    170 Oct 29 10:32 data
.
.
.
~/documents/mapping/map675/module-02>

```
git status shows all the uncommitted files
```bash
~/documents/mapping/map675/module-02> git status
On branch master

No commits yet

Untracked files:
 (use "git add <file>..." to include in what will be committed)

   app.js
   data/
   index.html
   node_modules/
   notes.md
   package-lock.json
   package.json
   project-files/
   server.js

nothing added to commit but untracked files present (use "git add" to track)
~/documents/mapping/map675/module-02>
It will not be necessary to commit the node_modules folder to the remote repo so it needs to be ignored
To ignore specific files and folders create a file called gitignore
```
touch .gitignore
open .gitignore to add the node_modules/ folder
more .gitignore
```bash
~/documents/mapping/map675/module-02> touch .gitignore
~/documents/mapping/map675/module-02> more .gitignore
node_modules/
~/documents/mapping/map675/module-02>
```
git status now shows the newly created file (.gitignore) plus the node_modules folder is now not listed
```bash
~/documents/mapping/map675/module-02> git status
On branch master

No commits yet

Untracked files:
 (use "git add <file>..." to include in what will be committed)

   .gitignore
   app.js
   data/
   index.html
   notes.md
   package-lock.json
   package.json
   project-files/
   server.js

nothing added to commit but untracked files present (use "git add" to track)
~/documents/mapping/map675/module-02>
```
git add all the files



Create git hub repo
```bash
curl -u 'markcruse' https://api.github.com/user/repos -d '{"name":"Module-02","description":"Module-02"}'
git remote add origin git@github.com:markcruse/Module-02.git
git push -u origin master
```
For and explaination of how the above works visit [https://stackoverflow.com/a/7563830](https://stackoverflow.com/a/7563830)
[How to install and use Hub](https://stackoverflow.com/a/31795003)


git status
git add
git status
git commit -m ""
git push -u origin master

```

```bash
