import fs, { mkdirSync } from 'fs';
import { join } from 'path';
import { exit } from 'process';
import prompts from 'prompts';

export default class Init {
    private readonly pwd: string = process.cwd();
    private readonly kompromitiDir: string = join(this.pwd, '.kompromiti');
    private readonly interkaptoDir: string = join(this.kompromitiDir, 'interkapto');
    private readonly configJsonFile: string = join('interkapto.json');

    public constructor(
		private forceMode: boolean = false,
        private yesMode: boolean = false
    ) {}

    public createConfigFiles(): void {
        fs.writeFileSync(this.configJsonFile, JSON.stringify({}));
    }

    public execute(): void {
        mkdirSync(this.interkaptoDir, {
            recursive: true
        });

        if (!fs.existsSync(this.configJsonFile)) {
            this.createConfigFiles();
            exit(0);
        }

        if (this.forceMode) {
            if (this.yesMode) {
                this.createConfigFiles();
                exit(0);
            }

            prompts({
                type: 'confirm',
                name: 'confirmResult',
                initial: false,
                message: 'You really want to reinitalize the interkapto configuration?'
            }).then((data) => {
                if (!data.confirmResult) {
                    console.log('\x1b[31mOperation cancelled');
                    exit(0);
                }

                this.createConfigFiles();
            });
        }

        console.log('\x1b[31mThe interkapto configuration already been initialized');
    }
}
