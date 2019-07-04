import Parse from 'parse/react-native';
import Singleton from '../utils/Singleton';

const singleton = Singleton.getInstance();

const orderSort = function(a,b) {
    if (a.get("order") < b.get("order")) { return -1;}
    if (a.get("order") > b.get("order")) { return 1; }
    return 0;
  };

export default class Quests{

    loadQuests(callback) {
        var self = this;
  
        var journeys;
  
        var JourneyClass = Parse.Object.extend("Journey");
        var query = new Parse.Query(JourneyClass);
        query.equalTo("bot",  singleton.getBot());
        query.limit(100000);
  
        query.find().then(function(foundJoureys) {
          journeys = foundJoureys;
          var QuestClass = Parse.Object.extend("Quest");
          var query2 = new Parse.Query(QuestClass);
          query2.equalTo("bot", singleton.getBot());
          query2.ascending('order');
  
          query2.addAscending('createdAt');
          query2.limit(100000)
          return  query2.find();
        })
        .then(function(parseQuests) {
  
          var router, defaultUnhandledQuestId;
          var quests = []
          for (var i = 0; i < parseQuests.length; i++) {
            if (parseQuests[i].get("isRouter")) {
              router = parseQuests[i];
            } else {
              if (parseQuests[i].get("isDefaultUnhandled")) { defaultUnhandledQuestId = parseQuests[i].id; }
              quests.push(parseQuests[i])
            }
          }
  
          self.setJourneysAndQuests(journeys, quests, false, callback);
        }).catch(function(error) {
          console.warn("Error Loading Quests and Journeys", error);
          callback(true, null);
        })
      }
  
      setJourneysAndQuests(journeysParam, questsParam,  isSaving, callback) {
        var journeys = [...journeysParam]
        var quests = [...questsParam]
        var journeysAndQuests = [];
        journeys.sort(orderSort)
  
        for (var i = 0; i < journeys.length; i++) {
          journeys[i].quests = [];
        }
        for (var i = 0; i < quests.length; i++) {
          var quest = quests[i];
          var foundAHome = null;
          for (var j = 0; j < journeys.length; j++) {
            if (quest.get("newJourney") && quest.get("newJourney").id == journeys[j].id) {
              journeys[j].quests.push(quest)
              foundAHome = true;
            }
          }
          if (!foundAHome && journeys.length > 0) {
            console.warn("I didn't find quest for journey. Fixing.", quests[i].get("name"))
            quests[i].set("newJourney", journeys[0])
            quests[i].set("order", journeys[0].quests.length)
            quests[i].save();
          }
        }
  
        for (var i = 0; i < journeys.length; i++) {
          journeys[i].quests.sort(orderSort)
        }
  
        console.log('journeys:', journeys);
        console.log('Quests:', quests);
        callback(false, journeys);
      }
}