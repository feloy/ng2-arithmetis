import { Injectable, NgZone } from '@angular/core';

declare var gapi, i18next;

@Injectable()
export class GpgsService {

  public connected;
  public user;
  public profile;

  private static levelBoard: string = 'CgkIg-L2stUXEAIQHw';

  private static levels: Array<string> = [
    'CgkIg-L2stUXEAIQIQ',
    'CgkIg-L2stUXEAIQIg',
    'CgkIg-L2stUXEAIQIw',
    'CgkIg-L2stUXEAIQJA',
    'CgkIg-L2stUXEAIQJQ',
    'CgkIg-L2stUXEAIQJg',
    'CgkIg-L2stUXEAIQJw',
    'CgkIg-L2stUXEAIQKA',
    'CgkIg-L2stUXEAIQKQ',
    'CgkIg-L2stUXEAIQKg'
  ];
  constructor(private zone: NgZone) { }

  public createSigninButton() {
    gapi.signin2.render(
      'google-login-button',
      {
        'onSuccess': (user) => {
          this.zone.run(() => {
            this.connected = true;
            this.user = user;
            this.profile = this.user.getBasicProfile();
          });
        },
        'scope': 'profile',
        'theme': 'dark',
        'onfailure': (err) => {
        }
      });
  }

  public signout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.zone.run(() => {
        this.connected = false;
        this.user = null;
        this.profile = null;
      });
    });
  }

  public sendLeaderboardLevel(level: number) {
    if (!this.connected) {
      return;
    }
    gapi.client.load('games', 'v1', (response1) => {
      var request = gapi.client.games.scores.submit(
        {
          leaderboardId: GpgsService.levelBoard,
          score: level
        }
      );
      request.execute(function (response) {
      });
    });
  }

  public sendLeaderboardChrono(level: number, secs: number) {
    if (level > 10) {
      return;
    }
    if (!this.connected) {
      return;
    }
    gapi.client.load('games', 'v1', (response1) => {
      var request = gapi.client.games.scores.submit(
        {
          leaderboardId: GpgsService.levels[level - 1],
          score: 1000 * secs
        }
      );
      request.execute(function (response) {
      });
    });
  }

  public getMyBestAtLevel(level: number, callback: (score) => void) {
    if (!this.connected) {
      return;
    }
    gapi.client.load('games', 'v1', (response1) => {
      var request = gapi.client.games.scores.get(
        {
          leaderboardId: GpgsService.levels[level - 1],
          playerId: this.user.getId(),
          timeSpan: 'ALL_TIME'
        }
      );
      request.execute(response => {
        this.zone.run(() => {
          callback(response);
        });
      });
    });
  }

  public getLeaderboardForLevel(level: number, callback: (a: any) => void) {
    this.getLeaderboard(GpgsService.levels[level - 1], callback);
  }

  public getLeaderboard(id: string, callback: (a: any) => void) {
    gapi.client.load('games', 'v1', (response1) => {
      var request = gapi.client.games.leaderboards.get(
        {
          leaderboardId: id,
          language: this.getI18nFirstLanguage()
        }
      );
      request.execute(response => {
        this.zone.run(() => {
          callback(response);
        });
      });
    });
  }

  public getLeaderboardList(callback: (a: any) => void) {
    gapi.client.load('games', 'v1', (response1) => {
      var request = gapi.client.games.leaderboards.list(
        {
          language: this.getI18nFirstLanguage(),
          maxResults: 50
        }
      );
      request.execute(response => {
        let allBoards = GpgsService.levels;
        allBoards.push(GpgsService.levelBoard);
        response.items = response.items.filter(item => {
          return allBoards.indexOf(item.id) > -1;
        });
        this.zone.run(() => {
          callback(response);
        });
      });
    });
  }

  public getScoresForLevel(level: number, callback: (a: any) => void) {
    this.getScores(GpgsService.levels[level - 1], callback);
  }

  public getScores(id: string, callback: (a: any) => void) {
    gapi.client.load('games', 'v1', (response1) => {
      var request = gapi.client.games.scores.list(
        {
          collection: 'PUBLIC',
          leaderboardId: id,
          timeSpan: 'ALL_TIME',
          maxResults: 25,
          language: this.getI18nFirstLanguage()
        }
      );
      request.execute(response => {
        this.zone.run(() => {
          callback(response);
        });
      });
    });
  }

  // not here
  private getI18nFirstLanguage() {
    return i18next.languages[0];
  }
}
