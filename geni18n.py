import os
import sys
import re
import json


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def merge(edited, destination):
    for key, value in edited.items():
        if isinstance(value, dict):
            if key in destination.keys():
                if isinstance(destination[key], dict):
                    node = destination.setdefault(key, {})
                    merge(value, node)
            else:
                print(bcolors.UNDERLINE + 'Removed unused : ' + key + bcolors.ENDC)
        else:
            if key in destination.keys():
                if not isinstance(destination[key], dict):
                    destination[key] = value
            else:
                print(bcolors.UNDERLINE + 'Removed unused : ' + key + bcolors.ENDC)
    return destination


# Help
if sys.argv[1] == '-h':
    print('Run command as below:')
    print(bcolors.OKBLUE +
          '    python geni18n.py [source_directory_path_to_scan] [output_translate_directory] [...languages]' + bcolors.ENDC)
    print('Example:')
    print(bcolors.OKBLUE +
          '>>> python geni18n.py ./src ./src/locale km en th cn vn' + bcolors.ENDC)
    sys.exit()

# Grab arguments
walk_dir = sys.argv[1]
locale_dir = sys.argv[2]
del sys.argv[0:3]
langs = sys.argv
as_json = True

# All locale strings
all = []

# Scan subdiretory recursively
for root, subdirs, files in os.walk(walk_dir):
    # Limit on .vue
    files = [fi for fi in files if (fi.endswith(".vue") or fi.endswith(".js"))]
    # Get into all vue files
    for file in files:
        file = os.path.join(root, file)
        print(bcolors.OKGREEN + 'Opening file ' + file + bcolors.ENDC)
        # Open file async
        f = open(file, "r")
        # Find matched string rule $t('string') , $t("string"), $t(  'string'  ), $t( \n'string'\n ), $t  ('string"), $t \n ( 'string')
        result = re.findall(
            r"\$t[\ \n]*\([\ \n]*[\'\"][^\)]+[\'\"][^\)]*\)", f.read(), re.DOTALL)
        all += result
# Remove $t('__') or $t('__','string')
all = [re.sub(r'\$t[\ \n]*\([\ \n]*[\'\"]|[\'\"][^\)]*\)', '', s) for s in all]
all = list(dict.fromkeys(all))
print('\nFound:')
print(bcolors.OKBLUE + json.dumps(all, indent=2) + bcolors.ENDC + '\n')

convert = {}
# In all found locale strings
for locale_string in all:
    # Split them by .
    split = locale_string.split('.')
    a = convert
    # Each period(.) level, create object
    for i in range(len(split) - 1):
        if split[i] in a.keys() and type(a[split[i]]) == str:
            a[split[i] + "__"] = a[split[i]]
            print(bcolors.WARNING + 'Redundance ' +
                  split[i] + ", created " + split[i] + "__" + bcolors.ENDC)
            a[split[i]] = {}
        if not (split[i] in a.keys() and type(a[split[i]]) == dict):
            a[split[i]] = {}
        a = a[split[i]]
    # Until the end, just empty string
    if split[len(split)-1] not in a.keys():
        def getSentence(name):
            return re.sub('([A-Z])', r' \1', name).capitalize()
        a[split[len(split)-1]] = getSentence(split[len(split)-1])
    else:
        # In case redundance key str vs dict
        if isinstance(a[split[len(split)-1]], dict):
            a[split[len(split)-1] + '__'] = getSentence(split[len(split)-1])
            print(bcolors.WARNING + 'Redundance ' +
                  split[len(split)-1] + ", created " + split[len(split)-1] + "__" + bcolors.ENDC)
# print(a)
for lang in langs:
    if (as_json):
        # Get existing translation file
        exists = os.path.isfile(os.path.join(locale_dir, lang + ".json"))
        if exists:
            try:
                f = open(os.path.join(locale_dir, lang + ".json"), "r")
                data = json.load(f)
                f.close()
            except:
                print(bcolors.FAIL + 'Content in ' + lang +
                      '.json is invalid format' + bcolors.ENDC)
                continue
        else:
            data = 0

        if data == 0:
            print(bcolors.OKGREEN + 'Create new ' + lang + bcolors.ENDC)
            try:
                result = json.dumps(convert, indent=2, sort_keys=True)
                if hasattr(result, 'decode'):
                    result = result.decode(
                        'unicode-escape').encode('utf8')
                else:
                    result = result.encode('utf8').decode(
                        'unicode-escape')
                # Write/Overwrite new file
                f = open(os.path.join(locale_dir, lang + ".json"), "w+")
                f.write(result)
                f.close()
            except:
                print(bcolors.FAIL + 'Error writing ' +
                      lang + '.json' + bcolors.ENDC)
        else:
            print(bcolors.OKGREEN + 'Update existing ' + lang + bcolors.ENDC)
            try:
                result = json.dumps(merge(data, convert),
                                    indent=2, sort_keys=True)
                if hasattr(result, 'decode'):
                    result = result.decode(
                        'unicode-escape').encode('utf8')
                else:
                    result = result.encode('utf8').decode(
                        'unicode-escape')
                # Write/Overwrite new file
                f = open(os.path.join(locale_dir, lang + ".json"), "w+")
                f.write(result)
                f.close()
            except:
                print(bcolors.FAIL + 'Error writing ' +
                      lang + '.json' + bcolors.ENDC)
    else:
        def get_result(lang): return 'export const locale' + lang.capitalize() + ' = ' + \
            json.dumps(convert, indent=2, sort_keys=True).decode(
            'unicode-escape').encode('utf8')
        f = open(os.path.join(locale_dir, lang + ".js"), "w+")
        f.write(get_result(lang))
        f.close()

print(bcolors.OKBLUE + '\n-----END-----\n' + bcolors.ENDC)
